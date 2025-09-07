from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
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

# Database configuration from environment variables
db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'job_portal')
}

# ... rest of your code remains the same ...
# Database connection helper
def get_db_connection():
    return mysql.connector.connect(**db_config)

# JWT token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            
            # Verify user exists in database
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT id, username FROM users WHERE id = %s", (data['user_id'],))
            current_user = cursor.fetchone()
            conn.close()
            
            if not current_user:
                return jsonify({'message': 'Invalid token!'}), 401
                
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
        
    return decorated

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(request.json)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({'success': False, 'message': 'All fields are required'}), 400
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if user already exists
        cursor.execute("SELECT id FROM users WHERE email = %s OR username = %s", (email, username))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'message': 'User already exists'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Insert new user
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_password.decode('utf-8'))
        )
        user_id = cursor.lastrowid
        
        # Create empty profile
        cursor.execute(
            "INSERT INTO profiles (user_id) VALUES (%s)",
            (user_id,)
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': 'User created successfully. Please login.'
        }), 201
        
    except Exception as e: 
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Get user by email
        cursor.execute(
            "SELECT id, username, password FROM users WHERE email = %s", 
            (email,)
        )
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        
        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user_id': user['id'],
            'username': user['username']
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Get profile data
        cursor.execute("""
            SELECT first_name, last_name, contact, gender, current_state, work_mode
            FROM profiles 
            WHERE user_id = %s
        """, (current_user['id'],))
        profile = cursor.fetchone()
        
        if not profile:
            return jsonify({'success': False, 'message': 'Profile not found'}), 404
        
        # Get interests
        cursor.execute("""
            SELECT interest 
            FROM profile_interests 
            WHERE profile_id = (
                SELECT id FROM profiles WHERE user_id = %s
            )
        """, (current_user['id'],))
        interests = [row['interest'] for row in cursor.fetchall()]
        
        # Get preferred states
        cursor.execute("""
            SELECT state 
            FROM profile_preferred_states 
            WHERE profile_id = (
                SELECT id FROM profiles WHERE user_id = %s
            )
        """, (current_user['id'],))
        preferred_states = [row['state'] for row in cursor.fetchall()]
        
        conn.close()
        
        return jsonify({
            'success': True,
            'profile': {
                **profile,
                'interests': interests,
                'preferred_states': preferred_states
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    data = request.get_json()
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get profile ID
        cursor.execute("SELECT id FROM profiles WHERE user_id = %s", (current_user['id'],))
        profile_result = cursor.fetchone()
        
        if not profile_result:
            return jsonify({'success': False, 'message': 'Profile not found'}), 404
            
        profile_id = profile_result[0]
        
        # Update basic profile info
        cursor.execute("""
            UPDATE profiles 
            SET first_name = %s, last_name = %s, contact = %s, 
                gender = %s, current_state = %s, work_mode = %s
            WHERE user_id = %s
        """, (
            data.get('first_name'), 
            data.get('last_name'), 
            data.get('contact'),
            data.get('gender'),
            data.get('current_state'),
            data.get('work_mode'),
            current_user['id']
        ))
        
        # Update interests (clear existing and add new)
        cursor.execute("DELETE FROM profile_interests WHERE profile_id = %s", (profile_id,))
        for interest in data.get('interests', []):
            cursor.execute(
                "INSERT INTO profile_interests (profile_id, interest) VALUES (%s, %s)",
                (profile_id, interest)
            )
        
        # Update preferred states (clear existing and add new)
        cursor.execute("DELETE FROM profile_preferred_states WHERE profile_id = %s", (profile_id,))
        for state in data.get('preferred_states', []):
            cursor.execute(
                "INSERT INTO profile_preferred_states (profile_id, state) VALUES (%s, %s)",
                (profile_id, state)
            )
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
@app.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    # With JWT, logout is typically handled client-side by removing the token
    # This endpoint can be used for logging activities or blacklisting tokens if needed
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)