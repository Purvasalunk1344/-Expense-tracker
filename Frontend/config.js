// API Configuration
// Change this based on your environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     (window.location.hostname === 'localhost' 
                       ? 'http://localhost:5000/api' 
                       : 'https://expense-tracker-sjh1.onrender.com/api');

// Export for use in other files
window.API_BASE_URL = API_BASE_URL;
