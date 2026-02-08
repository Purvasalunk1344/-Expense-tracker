// API Configuration (browser-safe)
// Priority: window.__API_BASE_URL__ override -> localhost check -> production URL
(function () {
 var API_BASE_URL = 'https://thorough-illumination-production-d205.up.railway.app/api';

  if (typeof window.__API_BASE_URL__ !== 'undefined' && window.__API_BASE_URL__) {
    API_BASE_URL = window.__API_BASE_URL__;
  } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE_URL = 'http://localhost:5000/api';
  }

  // Expose to other scripts
  window.API_BASE_URL = API_BASE_URL;
})();
