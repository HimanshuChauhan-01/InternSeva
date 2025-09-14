from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import jwt
import datetime
from functools import wraps
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')

# MongoDB configuration from environment variables
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
db_name = os.getenv('DB_NAME', 'job_portal')

# MongoDB connection
try:
    client = MongoClient(mongo_uri)
    db = client[db_name]
    print(f"Connected to MongoDB: {db_name}")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise

# JWT token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'success': False, 'message': 'Token is missing!'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            
            # Verify user exists in database
            user = db.users.find_one({'_id': ObjectId(data['user_id'])})
            
            if not user:
                return jsonify({'success': False, 'message': 'Invalid token!'}), 401
                
            # Convert ObjectId to string for consistency
            current_user = {
                'id': str(user['_id']),
                'username': user['username'],
                'email': user['email']
            }
            
        except jwt.ExpiredSignatureError:
            return jsonify({'success': False, 'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'success': False, 'message': 'Invalid token!'}), 401
        except Exception as e:
            return jsonify({'success': False, 'message': 'Token validation error!'}), 401
            
        return f(current_user, *args, **kwargs)
        
    return decorated

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    try:
        # Get and validate request data
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No JSON data received'}), 400
            
        username = data.get('username', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()
        
        print(f"DEBUG: Received signup data - Username: '{username}', Email: '{email}'")
        
        # Validation
        if not username or not email or not password:
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        if len(password) < 6:
            return jsonify({'success': False, 'message': 'Password must be at least 6 characters'}), 400
        
        if len(username) < 3:
            return jsonify({'success': False, 'message': 'Username must be at least 3 characters'}), 400
        
        # Check if user already exists
        existing_user = db.users.find_one({
            '$or': [
                {'email': email},
                {'username': username}
            ]
        })
        
        if existing_user:
            return jsonify({'success': False, 'message': 'User already exists with this email or username'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Insert new user
        user_data = {
            'username': username,
            'email': email,
            'password': hashed_password.decode('utf-8'),
            'created_at': datetime.datetime.utcnow()
        }
        
        result = db.users.insert_one(user_data)
        user_id = result.inserted_id
        
        # Create empty profile
        profile_data = {
            'user_id': user_id,
            'first_name': '',
            'last_name': '',
            'contact': '',
            'gender': '',
            'current_state': '',
            'work_mode': '',
            'interests': [],
            'preferred_states': [],
            'created_at': datetime.datetime.utcnow(),
            'updated_at': datetime.datetime.utcnow()
        }
        
        db.profiles.insert_one(profile_data)
        
        # Generate JWT token for immediate login after signup
        token = jwt.encode({
            'user_id': str(user_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        print(f"SUCCESS: Created user with ID: {user_id}, Username: '{username}'")
        
        return jsonify({
            'success': True, 
            'message': 'User created successfully',
            'token': token,
            'user_id': str(user_id),
            'username': username
        }), 201
        
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'success': False, 'message': 'An unexpected error occurred'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No JSON data received'}), 400
            
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()
        
        print(f"DEBUG: Login attempt - Email: '{email}'")
        
        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        # Get user by email
        user = db.users.find_one({'email': email})
        
        if not user:
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
        
        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        print(f"SUCCESS: Login successful for user: {user['username']}")
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user_id': str(user['_id']),
            'username': user['username'],
            'email': user['email']
        }), 200
        
    except Exception as e:
        print(f"Unexpected error during login: {str(e)}")
        return jsonify({'success': False, 'message': 'An unexpected error occurred'}), 500

@app.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    try:
        # Get profile data
        profile = db.profiles.find_one({'user_id': ObjectId(current_user['id'])})
        
        if not profile:
            # Create empty profile if it doesn't exist
            profile_data = {
                'user_id': ObjectId(current_user['id']),
                'first_name': '',
                'last_name': '',
                'contact': '',
                'gender': '',
                'current_state': '',
                'work_mode': '',
                'interests': [],
                'preferred_states': [],
                'created_at': datetime.datetime.utcnow(),
                'updated_at': datetime.datetime.utcnow()
            }
            
            db.profiles.insert_one(profile_data)
            profile = profile_data
        
        # Convert ObjectId to string for JSON serialization
        profile['_id'] = str(profile['_id'])
        profile['user_id'] = str(profile['user_id'])
        
        return jsonify({
            'success': True,
            'profile': {
                'first_name': profile.get('first_name', ''),
                'last_name': profile.get('last_name', ''),
                'contact': profile.get('contact', ''),
                'gender': profile.get('gender', ''),
                'current_state': profile.get('current_state', ''),
                'work_mode': profile.get('work_mode', ''),
                'interests': profile.get('interests', []),
                'preferred_states': profile.get('preferred_states', [])
            }
        }), 200
        
    except Exception as e:
        print(f"Error getting profile: {str(e)}")
        return jsonify({'success': False, 'message': 'Failed to get profile'}), 500

@app.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        # Update profile
        update_data = {
            'first_name': data.get('first_name', ''),
            'last_name': data.get('last_name', ''),
            'contact': data.get('contact', ''),
            'gender': data.get('gender', ''),
            'current_state': data.get('current_state', ''),
            'work_mode': data.get('work_mode', ''),
            'interests': data.get('interests', []),
            'preferred_states': data.get('preferred_states', []),
            'updated_at': datetime.datetime.utcnow()
        }
        
        # Use upsert to create if doesn't exist
        result = db.profiles.update_one(
            {'user_id': ObjectId(current_user['id'])},
            {'$set': update_data},
            upsert=True
        )
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully'
        }), 200
        
    except Exception as e:
        print(f"Error updating profile: {str(e)}")
        return jsonify({'success': False, 'message': 'Failed to update profile'}), 500

@app.route('/user', methods=['GET'])
@token_required
def get_user_info(current_user):
    try:
        return jsonify({
            'success': True,
            'user': {
                'id': current_user['id'],
                'username': current_user['username'],
                'email': current_user['email']
            }
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': 'Failed to get user info'}), 500

@app.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    # With JWT, logout is typically handled client-side by removing the token
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Check if MongoDB is responding
        client.admin.command('ismaster')
        return jsonify({'success': True, 'message': 'Server and database are healthy'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': f'Health check failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("Starting Flask server with MongoDB...")
    print(f"Database: {db_name}")
    app.run(debug=True, port=5000, host='0.0.0.0')