import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import voxen from '../assets/Ask_Voxen_SVG.svg'

const InternshipChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    field: '',
    duration: '',
    type: ''
  });
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Available languages with focus on Indian languages
  const languages = {
    English: { code: 'en-IN', name: 'English' },
    Hindi: { code: 'hi-IN', name: 'हिंदी' },
    Bengali: { code: 'bn-IN', name: 'বাংলা' },
    Telugu: { code: 'te-IN', name: 'తెలుగు' },
    Tamil: { code: 'ta-IN', name: 'தமிழ்' }
  };

  // Indian internship data with Indian companies and locations
  const internshipData = [
    { 
      id: 1, 
      title: "Frontend Development Intern", 
      company: "TechMahindra", 
      location: "Bangalore, Karnataka", 
      field: "Software Development", 
      duration: "3 months", 
      type: "Paid", 
      description: "Work on web applications using React and Angular. Ideal for students with JavaScript knowledge.", 
      logo: "💻",
      stipend: "₹30,000/month"
    },
    { 
      id: 2, 
      title: "Data Science Intern", 
      company: "Infosys", 
      location: "Hyderabad, Telangana", 
      field: "Data Science", 
      duration: "6 months", 
      type: "Paid", 
      description: "Analyze datasets and build machine learning models. Python and statistics knowledge required.", 
      logo: "📊",
      stipend: "₹25,000/month"
    },
    { 
      id: 3, 
      title: "Marketing Intern", 
      company: "Hindustan Unilever", 
      location: "Mumbai, Maharashtra", 
      field: "Marketing", 
      duration: "4 months", 
      type: "Paid", 
      description: "Develop marketing campaigns and analyze consumer metrics. Creativity and communication skills valued.", 
      logo: "📈",
      stipend: "₹20,000/month"
    },
    { 
      id: 4, 
      title: "UX/UI Design Intern", 
      company: "Flipkart", 
      location: "Bengaluru, Karnataka", 
      field: "Design", 
      duration: "3 months", 
      type: "Paid", 
      description: "Create user interfaces for e-commerce applications. Portfolio required.", 
      logo: "🎨",
      stipend: "₹25,000/month"
    },
    { 
      id: 5, 
      title: "Content Writing Intern", 
      company: "BYJU'S", 
      location: "Remote", 
      field: "Content", 
      duration: "3 months", 
      type: "Paid", 
      description: "Create educational content for online learning platforms. Good writing skills in English and Hindi required.", 
      logo: "📝",
      stipend: "₹15,000/month"
    }
  ];

  // Language-specific content with Indian language translations
  const content = {
    English: {
      welcome: "Hello! Welcome to Voxen. Which language do you prefer?",
      languageSet: "Great! How would you like to find internships?",
      suggestOption: "Suggest internships",
      filterOption: "Filter myself",
      modifyFilters: "Modify filters",
      searchWithFilters: "Search with filters",
      startOver: "Start over",
      filtersTitle: "Filter Internships",
      locationLabel: "Location:",
      fieldLabel: "Field:",
      durationLabel: "Duration:",
      typeLabel: "Type:",
      anyLocation: "Any Location",
      anyField: "Any Field",
      anyDuration: "Any Duration",
      anyType: "Any Type",
      searchButton: "Search Internships",
      suggestionsTitle: "Based on your profile, I suggest these internships:",
      foundResults: "I found {count} internships matching your criteria:",
      noResults: "Sorry, no internships match your filters. Would you like to try different criteria?",
      listening: "Listening...",
      speakPrompt: "Click the microphone to speak your message",
      voiceNotSupported: "Voice input is not supported in your browser"
    },
    Hindi: {
      welcome: "नमस्ते! इंटर्नकनेक्ट इंडिया में आपका स्वागत है। आप कौन सी भाषा पसंद करते हैं?",
      languageSet: "बढ़िया! आप इंटर्नशिप कैसे ढूंढना चाहेंगे?",
      suggestOption: "इंटर्नशिप सुझाएं",
      filterOption: "खुद फिल्टर करें",
      modifyFilters: "फिल्टर संशोधित करें",
      searchWithFilters: "फिल्टर के साथ खोजें",
      startOver: "फिर से शुरू करें",
      filtersTitle: "इंटर्नशिप फिल्टर करें",
      locationLabel: "स्थान:",
      fieldLabel: "क्षेत्र:",
      durationLabel: "अवधि:",
      typeLabel: "प्रकार:",
      anyLocation: "कोई भी स्थान",
      anyField: "कोई भी क्षेत्र",
      anyDuration: "कोई भी अवधि",
      anyType: "कोई भी प्रकार",
      searchButton: "इंटर्नशिप खोजें",
      suggestionsTitle: "आपकी प्रोफाइल के आधार पर, मैं ये इंटर्नशिप सुझाता हूं:",
      foundResults: "मुझे आपकी criteria से मेल खाती {count} इंटर्नशिप मिली:",
      noResults: "क्षमा करें, कोई इंटर्नशिप आपके फिल्टर से मेल नहीं खाती। क्या आप different criteria आज़माना चाहेंगे?",
      listening: "सुन रहा हूं...",
      speakPrompt: "अपना संदेश बोलने के लिए माइक्रोफोन पर क्लिक करें",
      voiceNotSupported: "आपके ब्राउज़र में voice input supported नहीं है"
    },
    Bengali: {
      welcome: "হ্যালো! ইন্টার্নকানেক্ট ইন্ডিয়াতে স্বাগতম। আপনি কোন ভাষা পছন্দ করেন?",
      languageSet: "দারুণ! আপনি কীভাবে ইন্টার্নশিপ খুঁজতে চান?",
      suggestOption: "ইন্টার্নশিপ সুপারিশ করুন",
      filterOption: "নিজে ফিল্টার করুন",
      modifyFilters: "ফিল্টার সংশোধন করুন",
      searchWithFilters: "ফিল্টার দিয়ে অনুসন্ধান করুন",
      startOver: "আবার শুরু করুন",
      filtersTitle: "ইন্টার্নশিপ ফিল্টার করুন",
      locationLabel: "অবস্থান:",
      fieldLabel: "ক্ষেত্র:",
      durationLabel: "সময়সীমা:",
      typeLabel: "ধরন:",
      anyLocation: "যেকোনো অবস্থান",
      anyField: "যেকোনো ক্ষেত্র",
      anyDuration: "যেকোনো সময়সীমা",
      anyType: "যেকোনো ধরন",
      searchButton: "ইন্টার্নশিপ অনুসন্ধান করুন",
      suggestionsTitle: "আপনার প্রোফাইল এর উপর ভিত্তি করে, আমি এই ইন্টার্নশিপগুলি সুপারিশ করি:",
      foundResults: "আপনার মানদণ্ডের সাথে মেলে এমন {count}টি ইন্টার্নশিপ পেয়েছি:",
      noResults: "দুঃখিত, কোন ইন্টার্নশিপ আপনার ফিল্টারের সাথে মেলে না। আপনি কি ভিন্ন মানদণ্ড চেষ্টা করতে চান?",
      listening: "শুনছি...",
      speakPrompt: "আপনার বার্তা বলতে মাইক্রোফোনে ক্লিক করুন",
      voiceNotSupported: "আপনার ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়"
    },
    Telugu: {
      welcome: "హలో! ఇంటర్న్ కనెక్ట్ ఇండియాకు స్వాగతం. మీరు ఏ భాషను ప్రాధాన్యత ఇస్తారు?",
      languageSet: "అద్భుతం! మీరు ఇంటర్న్షిప్లను ఎలా కనుగొనాలనుకుంటున్నారు?",
      suggestOption: "ఇంటర్న్షిప్లను సూచించండి",
      filterOption: "నాకు మfilter చేసుకోండి",
      modifyFilters: "ఫిల్టర్లను సవరించండి",
      searchWithFilters: "ఫిల్టర్లతో శోధించండి",
      startOver: "మళ్లీ ప్రారంభించండి",
      filtersTitle: "ఇంటర్న్షిప్లను ఫిల్టర్ చేయండి",
      locationLabel: "స్థానం:",
      fieldLabel: "ఫీల్డ్:",
      durationLabel: "కాలవ్యవధి:",
      typeLabel: "రకం:",
      anyLocation: "ఏదైనా స్థానం",
      anyField: "ఏదైనా ఫీల్డ్",
      anyDuration: "ఏదైనా కాలవ్యవధి",
      anyType: "ఏదైనా రకం",
      searchButton: "ఇంటర్న్షిప్లను శోధించండి",
      suggestionsTitle: "మీ ప్రొఫైల్ ఆధారంగా, నేను ఈ ఇంటర్న్షిప్లను సూచిస్తున్నాను:",
      foundResults: "మీ ప్రమాణాలతో match అయ్యే {count} ఇంటర్న్షిప్లు నాకు దొరికాయి:",
      noResults: "క్షమించండి, మీ ఫిల్టర్లతో ఏ ఇంటర్న్షిప్లు match కావు. మీరు వేరే ప్రమాణాలను ప్రయత్నించాలనుకుంటున్నారా?",
      listening: "వినడం...",
      speakPrompt: "మీ సందేశం మాట్లాడటానికి మైక్రోఫోన్పై క్లిక్ చేయండి",
      voiceNotSupported: "మీ బ్రౌజర్లో voice input supported కాదు"
    },
    Tamil: {
      welcome: "வணக்கம்! இண்டர்ன்கனெக்ட் இந்தியாவிற்கு வரவேற்கிறோம். நீங்கள் எந்த மொழியை விரும்புகிறீர்கள்?",
      languageSet: "அருமை! இண்டர்ன்ஷிப்புகளை எவ்வாறு கண்டுபிடிக்க விரும்புகிறீர்கள்?",
      suggestOption: "இண்டர்ன்ஷிப்புகளை பரிந்துரைக்கவும்",
      filterOption: "நானே வடிகட்டவும்",
      modifyFilters: "வடிப்பான்களை மாற்றவும்",
      searchWithFilters: "வடிப்பான்களுடன் தேடவும்",
      startOver: "மீண்டும் தொடங்கவும்",
      filtersTitle: "இண்டர்ன்ஷிப்புகளை வடிகட்டவும்",
      locationLabel: "இடம்:",
      fieldLabel: "துறை:",
      durationLabel: "கால அளவு:",
      typeLabel: "வகை:",
      anyLocation: "எந்த இடமும்",
      anyField: "எந்த துறையும்",
      anyDuration: "எந்த கால அளவும்",
      anyType: "எந்த வகையும்",
      searchButton: "இண்டர்ன்ஷிப்புகளை தேடவும்",
      suggestionsTitle: "உங்கள் சுயவிவரத்தின் அடிப்படையில், இந்த இண்டர்ன்ஷிப்புகளை பரிந்துரைக்கிறேன்:",
      foundResults: "உங்கள் criteriaக்கு பொருந்தும் {count} இண்டர்ன்ஷிப்புகள் கிடைத்துள்ளன:",
      noResults: "மன்னிக்கவும், உங்கள் வடிப்பான்களுடன் பொருந்தும் இண்டர்ன்ஷிப்புகள் எதுவும் இல்லை. வெவ்வேறு criteria முயற்சிக்க விரும்புகிறீர்களா?",
      listening: "கேட்கிறது...",
      speakPrompt: "உங்கள் செய்தியை பேச மைக்ரோஃபோனை கிளிக் செய்யவும்",
      voiceNotSupported: "உங்கள் browser-ல் voice input supported இல்லை"
    }
  };

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulate typing with delay
  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  // Handle opening the chatbot
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      simulateTyping(() => {
        const welcomeMessage = { 
          text: content[language].welcome,
          sender: 'bot',
          options: Object.keys(languages)
        };
        setMessages([welcomeMessage]);
      }, 800);
    }
  };

  // Handle voice input
  const handleVoiceInput = (text) => {
    // Check if the text matches any language option
    const matchedLanguage = Object.keys(languages).find(
      lang => text.toLowerCase().includes(lang.toLowerCase())
    );
    
    if (matchedLanguage) {
      handleOptionSelect(matchedLanguage);
      return;
    }
    
    // Check if the text matches any other options
    const currentMessage = messages[messages.length - 1];
    if (currentMessage && currentMessage.options) {
      const matchedOption = currentMessage.options.find(
        option => text.toLowerCase().includes(option.toLowerCase())
      );
      
      if (matchedOption) {
        handleOptionSelect(matchedOption);
        return;
      }
    }
    
    // If no specific option matched, treat as free text input
    const userMessage = { text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    simulateTyping(() => {
      const botMessage = { 
        text: `I heard: "${text}". Please select from the available options.`,
        sender: 'bot',
        options: currentMessage.options
      };
      setMessages(prev => [...prev, botMessage]);
    });
  };

  // Start voice recognition
  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.lang = languages[language]?.code || 'en-IN';
      recognitionRef.current.start();
    } else {
      const botMessage = { 
        text: content[language].voiceNotSupported,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    const userMessage = { text: option, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    if (!language) {
      // Language selection
      setLanguage(option);
      simulateTyping(() => {
        const botMessage = { 
          text: content[option].languageSet,
          sender: 'bot',
          options: [content[option].suggestOption, content[option].filterOption]
        };
        setMessages(prev => [...prev, botMessage]);
      });
    } else if (!mode) {
      // Mode selection
      setMode(option.includes(content[language].suggestOption) ? 'suggest' : 'filter');
      
      simulateTyping(() => {
        if (option.includes(content[language].suggestOption)) {
          getInternshipSuggestions();
        } else {
          askForFilters();
        }
      });
    } else if (option === content[language].modifyFilters || option === content[language].searchWithFilters) {
      // Handle modify filters option
      simulateTyping(() => {
        askForFilters();
      });
    } else if (option === content[language].startOver) {
      // Handle start over option
      handleReset();
    }
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    const userMessage = { 
      text: `Applied filters: Location - ${filters.location || content[language].anyLocation}, Field - ${filters.field || content[language].anyField}, Duration - ${filters.duration || content[language].anyDuration}, Type - ${filters.type || content[language].anyType}`,
      sender: 'user' 
    };
    setMessages(prev => [...prev, userMessage]);
    simulateTyping(() => {
      performFilterSearch();
    });
  };

  // Get internship suggestions
  const getInternshipSuggestions = () => {
    const suggestedInternships = internshipData.slice(0, 3); // Get first 3 internships as suggestions
    
    const botMessage = { 
      text: content[language].suggestionsTitle, 
      sender: 'bot',
      internships: suggestedInternships,
      options: [content[language].searchWithFilters, content[language].startOver]
    };
    setMessages(prev => [...prev, botMessage]);
  };

  // Ask for filters
  const askForFilters = () => {
    const botMessage = { 
      text: content[language].filtersTitle, 
      sender: 'bot',
      showFilters: true
    };
    setMessages(prev => [...prev, botMessage]);
    setShowFilters(true);
  };

  // Perform filter-based search
  const performFilterSearch = () => {
    // Filter internships based on selected filters
    const filteredInternships = internshipData.filter(internship => {
      return (
        (!filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.field || internship.field.toLowerCase() === filters.field.toLowerCase()) &&
        (!filters.duration || internship.duration.toLowerCase() === filters.duration.toLowerCase()) &&
        (!filters.type || internship.type.toLowerCase() === filters.type.toLowerCase())
      );
    });
    
    let responseText = '';
    if (filteredInternships.length > 0) {
      responseText = content[language].foundResults.replace('{count}', filteredInternships.length);
    } else {
      responseText = content[language].noResults;
    }
    
    const botMessage = { 
      text: responseText, 
      sender: 'bot',
      internships: filteredInternships,
      options: [content[language].startOver, content[language].modifyFilters]
    };
    setMessages(prev => [...prev, botMessage]);
    setShowFilters(false);
  };

  // Reset conversation
  const handleReset = () => {
    setLanguage('English');
    setMode(null);
    setFilters({ location: '', field: '', duration: '', type: '' });
    setShowFilters(false);
    
    simulateTyping(() => {
      const welcomeMessage = { 
        text: content['English'].welcome,
        sender: 'bot',
        options: Object.keys(languages)
      };
      setMessages([welcomeMessage]);
    });
  };

  // Text-to-speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = languages[language]?.code || 'en-IN';
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-button" onClick={handleOpen}>
          <span className="chat-icon"><img src={voxen} alt="" /></span>
          <span className="pulse-ring"></span>
        </button>
      )}
      
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <div className="header-info">
              <div className="avatar">I</div>
              <div>
                <h3>Voxen</h3>
                <p>Online • Ready to help</p>
              </div>
            </div>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="chatbot-messages">
            <div className="welcome-message">
              <p>👋 नमस्ते! I'm your Voxen assistant. I can help you find the perfect internship opportunity in India!</p>
            </div>
            
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.sender === 'bot' && (
                  <div className="avatar">I</div>
                )}
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  
                  {message.options && (
                    <div className="message-options">
                      {message.options.map((option, i) => (
                        <button 
                          key={i} 
                          className="option-button"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {message.internships && message.internships.length > 0 && (
                    <div className="internships-list">
                      <h4>Internship Matches:</h4>
                      {message.internships.map(internship => (
                        <div key={internship.id} className="internship-card">
                          <div className="internship-logo">{internship.logo}</div>
                          <div className="internship-info">
                            <h5>{internship.title}</h5>
                            <p className="company">{internship.company} • {internship.location}</p>
                            <p className="field">{internship.field} | {internship.duration} | {internship.type}</p>
                            <p className="stipend">{internship.stipend}</p>
                            <p className="description">{internship.description}</p>
                          </div>
                          <button className="apply-button">Apply</button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.showFilters && (
                    <div className="filters-container">
                      <h4>{content[language].filtersTitle}</h4>
                      <div className="filter-group">
                        <label>{content[language].locationLabel}</label>
                        <select 
                          value={filters.location} 
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                        >
                          <option value="">{content[language].anyLocation}</option>
                          <option value="Bangalore">Bangalore, Karnataka</option>
                          <option value="Hyderabad">Hyderabad, Telangana</option>
                          <option value="Mumbai">Mumbai, Maharashtra</option>
                          <option value="Remote">Remote</option>
                          <option value="Pune">Pune, Maharashtra</option>
                          <option value="Chennai">Chennai, Tamil Nadu</option>
                          <option value="Delhi">Delhi</option>
                        </select>
                      </div>
                      
                      <div className="filter-group">
                        <label>{content[language].fieldLabel}</label>
                        <select 
                          value={filters.field} 
                          onChange={(e) => handleFilterChange('field', e.target.value)}
                        >
                          <option value="">{content[language].anyField}</option>
                          <option value="Software Development">Software Development</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Design">Design</option>
                          <option value="Biotechnology">Biotechnology</option>
                          <option value="Finance">Finance</option>
                          <option value="Content">Content</option>
                          <option value="Engineering">Engineering</option>
                        </select>
                      </div>
                      
                      <div className="filter-group">
                        <label>{content[language].durationLabel}</label>
                        <select 
                          value={filters.duration} 
                          onChange={(e) => handleFilterChange('duration', e.target.value)}
                        >
                          <option value="">{content[language].anyDuration}</option>
                          <option value="3 months">3 months</option>
                          <option value="4 months">4 months</option>
                          <option value="6 months">6 months</option>
                        </select>
                      </div>
                      
                      <div className="filter-group">
                        <label>{content[language].typeLabel}</label>
                        <select 
                          value={filters.type} 
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                        >
                          <option value="">{content[language].anyType}</option>
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                      
                      <button 
                        className="apply-filters-button"
                        onClick={handleApplyFilters}
                      >
                        {content[language].searchButton}
                      </button>
                    </div>
                  )}
                </div>
                
                {message.sender === 'bot' && (
                  <button 
                    className="speak-button"
                    onClick={() => speakText(message.text)}
                    title="Read aloud"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C11.2044 4.5 10.4413 4.81607 9.87868 5.37868C9.31607 5.94129 9 6.70435 9 7.5V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V7.5C15 6.70435 14.6839 5.94129 14.1213 5.37868C13.5587 4.81607 12.7956 4.5 12 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 12C18 12.7879 17.8448 13.5681 17.5433 14.2961C17.2417 15.0241 16.7998 15.6855 16.2426 16.2426C15.6855 16.7998 15.0241 17.2417 14.2961 17.5433C13.5681 17.8448 12.7879 18 12 18C11.2121 18 10.4319 17.8448 9.7039 17.5433C8.97595 17.2417 8.31451 16.7998 7.75736 16.2426C7.20021 15.6855 6.75825 15.0241 6.45672 14.2961C6.15519 13.5681 6 12.7879 6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 12C19 14.3869 18.0518 16.6761 16.364 18.364C14.6761 20.0518 12.3869 21 10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="avatar">I</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <div className="voice-input-prompt">
              {isListening ? (
                <div className="listening-indicator">
                  <span className="pulse-dot"></span>
                  {content[language].listening}
                  <button className="stop-listening-button" onClick={stopListening}>
                    Stop
                  </button>
                </div>
              ) : (
                <p>{content[language].speakPrompt}</p>
              )}
            </div>
            
            <div className="input-controls">
              <button 
                className={`voice-button ${isListening ? 'listening' : ''}`}
                onClick={isListening ? stopListening : startListening}
                title="Voice input"
              >
                {isListening ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C11.2044 2 10.4413 2.31607 9.87868 2.87868C9.31607 3.44129 9 4.20435 9 5V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V5C15 4.20435 14.6839 3.44129 14.1213 2.87868C13.5587 2.31607 12.7956 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              
              <button className="reset-button" onClick={handleReset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {content[language].startOver}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipChatbot;