# 💰 Expense Tracker – Full-Stack Web Application

A **production-ready, full-stack Expense Tracker** demonstrating **end-to-end development**, **secure authentication**, **cloud deployment**, and **real-world debugging skills**.

**🔗 Live Demo:** https://expense-tracker-phi-sandy.vercel.app  
**📂 GitHub:** https://github.com/Purvasalunk1344/-Expense-tracker

---

## ✨ Key Technical Achievements

### Authentication & Security
- ✅ Implemented **JWT-based authentication** with 1-hour token expiry
- ✅ Password hashing using **bcryptjs** (10-round salt)
- ✅ **Protected routes** with middleware-based authorization
- ✅ Token stored securely in localStorage with validation on page load

### Real-World Debugging (Resume Highlight)
- ✅ **Fixed ENOTFOUND errors** — resolved MySQL host resolution by parsing Railway's connection URL into environment variables
- ✅ **Fixed CORS issues** — configured Express CORS middleware to allow cross-origin requests from Vercel frontend
- ✅ **Fixed ER_NO_SUCH_TABLE errors** — implemented auto-migration scripts that create missing tables on startup
- ✅ **Fixed AUTO_INCREMENT failures** — added ALTER TABLE logic to fix existing schema
- ✅ **Fixed uncaught DB exceptions** — added proper error handling in routes to return 500 instead of crashing

### Database Design
- ✅ **Relational schema** with foreign key constraints (users ↔ expenses)
- ✅ **User-specific data isolation** — each user can only access their own expenses
- ✅ **Automatic timestamps** — created_at fields for audit trails
- ✅ **Cascading deletes** — expenses deleted when user deleted

### Frontend Architecture
- ✅ **Centralized API configuration** (config.js) — single source of truth for backend URLs
- ✅ **Token-aware fetch requests** — Authorization header automatically included
- ✅ **Dynamic month filtering** — JavaScript Date manipulation for timezone-safe filtering
- ✅ **DOM grouping by date** — expenses grouped by date with formatted headers
- ✅ **Form validation** — client-side checks before API calls

### Backend Architecture
- ✅ **RESTful API design** — 6 endpoints (register, login, create, read, update, delete)
- ✅ **Environment-driven configuration** — dotenv for local dev, Railway env vars for production
- ✅ **Middleware separation** — auth middleware for protected routes
- ✅ **Health endpoints** — `/health` for monitoring DB connectivity
- ✅ **Auto-migrations** — tables created on first deployment

### Deployment & DevOps
- ✅ **Multi-cloud setup** — Frontend on Vercel, Backend on Railway, DB on Railway MySQL
- ✅ **Environment variable parsing** — MYSQL_URL_RAW parsed into DB_HOST/PORT/USER/PASSWORD
- ✅ **Error logging** — startup logs for DB connection status
- ✅ **Zero-downtime migrations** — auto-create tables without manual SQL
- ✅ **Git-based CI/CD** — automatic deployments on git push

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Backend** | Node.js, Express.js, Middleware Pattern |
| **Database** | MySQL 8.0, Relational Schema |
| **Authentication** | JWT (jsonwebtoken), bcryptjs |
| **Deployment** | Vercel (Frontend), Railway (Backend + DB) |
| **Version Control** | Git, GitHub, Feature branches |
| **Tools** | REST APIs, Environment Variables, CORS |
---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vercel)                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  register.html  login.html  index.html                  │    │
│  │  ↓              ↓            ↓                           │    │
│  │  auth.js ←────────────→ script.js                       │    │
│  │  (Login/Register)      (CRUD/Filtering)                 │    │
│  │       ↓                  ↓                               │    │
│  │  config.js (Centralized API URL)                        │    │
│  └──────────────────────────┬──────────────────────────────┘    │
│                             │ HTTPS Requests                     │
│                             ↓                                    │
├─────────────────────────────────────────────────────────────────┤
│                  BACKEND (Railway)                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  server.js                                              │    │
│  │  ├─ CORS Middleware                                     │    │
│  │  ├─ Routes:                                             │    │
│  │  │  ├─ POST /api/auth/register                         │    │
│  │  │  ├─ POST /api/auth/login                            │    │
│  │  │  ├─ GET  /api/expenses                              │    │
│  │  │  ├─ POST /api/expenses                              │    │
│  │  │  ├─ PUT  /api/expenses/:id                          │    │
│  │  │  ├─ DELETE /api/expenses/:id                        │    │
│  │  │  └─ GET /health                                     │    │
│  │  ├─ Auth Middleware (JWT verification)                 │    │
│  │  └─ Auto-migrations (createTables.js)                  │    │
│  └──────────────────────┬──────────────────────────────────┘    │
│                         │ TCP Connection                        │
│                         ↓                                       │
├─────────────────────────────────────────────────────────────────┤
│              DATABASE (Railway MySQL)                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  users                    expenses                       │    │
│  │  ├─ id (PK)               ├─ id (PK, AUTO_INCREMENT)   │    │
│  │  ├─ email (UNIQUE)        ├─ title                     │    │
│  │  ├─ password (hashed)     ├─ amount                    │    │
│  │  └─ created_at            ├─ category                  │    │
│  │                           ├─ date                      │    │
│  │                           ├─ user_id (FK → users.id)   │    │
│  │                           └─ created_at                │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Features

### User Authentication
- **Register** — Email validation, password hashing, unique constraint
- **Login** — Credential verification, JWT token generation (1-hour expiry)
- **Token Storage** — localStorage with auto-logout on missing token
- **Protected Access** — Middleware ensures only authenticated users access expenses

### Expense Management (CRUD)
- **Create** — Add expense with title, amount, category, date
- **Read** — View all personal expenses with date grouping
- **Update** — Edit existing expense details
- **Delete** — Remove expense with cascade cleanup
- **Filter** — View expenses by month/year dropdown

### Data Display
- **Date Grouping** — Expenses grouped by date with emoji headers (📅)
- **Monthly Filtering** — Dropdown populated dynamically from stored expenses
- **Total Calculation** — Sum of filtered expenses displayed in currency (₹)
- **Edit/Delete UI** — Inline buttons for quick actions

---

## 📁 Project Structure

```
expense-tracker/
├── Frontend/
│   ├── index.html           # Dashboard (protected)
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── config.js           # Centralized API URL configuration
│   ├── auth.js             # Authentication logic (register/login)
│   ├── script.js           # Expense CRUD & filtering
│   ├── auth.css            # Auth pages styling
│   └── style.css           # Dashboard styling
│
├── Backend/
│   ├── server.js           # Express app, CORS, routes
│   ├── db.js               # MySQL connection, env var parsing
│   ├── package.json        # Dependencies
│   ├── .env                # Environment variables (secrets)
│   ├── .gitignore          # Exclude .env, node_modules
│   │
│   ├── middleware/
│   │   └── auth.js         # JWT token verification
│   │
│   ├── routes/
│   │   ├── authRoutes.js   # Register/Login endpoints
│   │   └── expenseRoutes.js # CRUD endpoints
│   │
│   └── migrations/
│       └── createTables.js # Auto-create tables on startup
│
├── .git                    # Version control
├── .gitignore             # Node modules, .env, artifacts
└── README.md              # This file
```

---

## 🔐 Authentication Flow

### Registration
```
User Input (email, password)
    ↓
Frontend: POST /api/auth/register {email, password}
    ↓
Backend: Hash password with bcryptjs
    ↓
Backend: INSERT INTO users (email, password_hash)
    ↓
Database: Unique constraint enforced on email
    ↓
Response: {message: "Registered"}
    ↓
Frontend: Redirect to login.html
```

### Login
```
User Input (email, password)
    ↓
Frontend: POST /api/auth/login {email, password}
    ↓
Backend: SELECT user FROM users WHERE email = ?
    ↓
Backend: Compare password hash with bcryptjs.compare()
    ↓
Backend: Generate JWT token {id: user.id, expiresIn: "1h"}
    ↓
Response: {token: "eyJhbGc..."}
    ↓
Frontend: localStorage.setItem("token", token)
    ↓
Frontend: Redirect to index.html (dashboard)
```

### Protected Route Access
```
Frontend: GET /api/expenses with Authorization: <token>
    ↓
Backend auth middleware: jwt.verify(token, SECRET)
    ↓
If valid: req.userId = decoded.id, next()
If invalid: Return 401 Unauthorized
    ↓
Route handler: SELECT * FROM expenses WHERE user_id = req.userId
    ↓
Response: [expense1, expense2, ...] (user-specific only)
```

---

## 🐛 Real-World Problems Solved

### Problem 1: Database Not Reachable (ENOTFOUND)
**Symptom:** `Error: getaddrinfo ENOTFOUND mysql.railway.internal`  
**Root Cause:** Railway MySQL internal hostname not resolvable from external servers  
**Solution:** Parse Railway's `MYSQL_URL_RAW` to extract public host/port  
**Code Fix:** URL parsing logic in `db.js` converts connection string to DB_* env vars  

### Problem 2: Missing Tables (ER_NO_SUCH_TABLE)
**Symptom:** `Error: Table 'railway.users' doesn't exist`  
**Root Cause:** Tables not created in Railway MySQL on first deployment  
**Solution:** Auto-migration script that runs CREATE TABLE IF NOT EXISTS on startup  
**Code Fix:** `migrations/createTables.js` called from `server.js` initialization  

### Problem 3: AUTO_INCREMENT Not Set
**Symptom:** `Error: Field 'id' doesn't have a default value`  
**Root Cause:** Existing `expenses` table lacked AUTO_INCREMENT on id column  
**Solution:** ALTER TABLE logic to fix existing schema  
**Code Fix:** Migration script runs ALTER TABLE MODIFY id INT AUTO_INCREMENT after CREATE  

### Problem 4: Uncaught DB Exceptions Causing 502
**Symptom:** Login returns 502 instead of JSON response  
**Root Cause:** Route handler didn't check `err` parameter in DB callback  
**Solution:** Proper error handling to catch DB errors and return 500  
**Code Fix:** Added `if (err) { return res.status(500).json(...); }` in login route  

### Problem 5: CORS Blocking Frontend Requests
**Symptom:** `No 'Access-Control-Allow-Origin' header is present`  
**Root Cause:** Express didn't allow requests from Vercel origin  
**Solution:** Configure CORS middleware to explicitly allow frontend domain  
**Code Fix:** Added `cors({ origin: "https://expense-tracker-phi-sandy.vercel.app", ... })`  

---

## 🚀 Live Links

- **Frontend (Vercel):** https://expense-tracker-phi-sandy.vercel.app
- **Backend API (Railway):** https://thorough-illumination-production-d205.up.railway.app
- **Health Check:** https://thorough-illumination-production-d205.up.railway.app/health
- **GitHub Repository:** https://github.com/Purvasalunk1344/-Expense-tracker

---

## 📚 Learning Outcomes & Skills Demonstrated

✅ **Full-Stack Development** — Built and deployed frontend + backend + database  
✅ **Authentication & Authorization** — JWT tokens, password hashing, protected routes  
✅ **Database Design** — Relational schema, foreign keys, constraints  
✅ **RESTful API Design** — Standard HTTP verbs, status codes, error handling  
✅ **Cloud Deployment** — Multi-cloud setup (Vercel, Railway), environment management  
✅ **Debugging Skills** — Diagnosed and fixed 5+ production issues independently  
✅ **Git & GitHub** — Version control, meaningful commits, .gitignore  
✅ **Error Handling** — Try-catch, callback error checks, user-friendly messages  
✅ **Environment Configuration** — dotenv, secrets management, dev/prod parity  
✅ **Middleware Architecture** — Auth middleware, CORS, request/response handling  

---

## 📄 Notes

**Status:** ✅ Production Ready  
**Built:** February 2026  
**License:** Open Source

---

*This project demonstrates professional full-stack development practices and real-world problem-solving skills.*
