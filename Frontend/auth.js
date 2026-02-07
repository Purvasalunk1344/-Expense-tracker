const AUTH_API = "https://expense-tracker-sjh1.onrender.com/api/auth";


console.log("auth.js loaded");

// REGISTER
function register() {
  console.log("Register clicked");
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }
  
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  fetch(`${AUTH_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert("Registration successful. Please login.");
    window.location.href = "login.html";
  })
  .catch(err => console.error(err));
}

// LOGIN
function login() {
  console.log("Login clicked");
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (!data.token) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", email);
    window.location.href = "index.html";
  })
  .catch(err => console.error(err));
}
