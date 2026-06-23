# AI Interview Report Generator

An AI-powered Full stack application that helps job seekers prepare for interviews by analyzing their resume, job description, and self-introduction. The application generates a detailed interview report including match score, strengths, weaknesses, improvement suggestions, and likely interview questions using Google's Gemini AI.
IT CAN ALSO GENERATE THE AI RESUME FOR THAT SPECIFIC JOB

---

## Features

- Secure User Authentication
  - User Registration and Login
  - JWT-based Authentication
  - Password Hashing with bcrypt

- Resume Analysis
  - Upload Resume Files
  - Extract and Process Resume Content

- AI-Powered Interview Report
  - Resume vs Job Description Match Analysis
  - Match Score Calculation
  - Strengths and Weaknesses Identification
  - Personalized Improvement Suggestions
  - Interview Preparation Guidance
  - Expected Technical and Behavioral Questions

- Input Validation
  - Robust Request Validation using Zod

- Responsive User Interface
  - Clean and User-Friendly Experience
  - Mobile and Desktop Compatible

---

## Tech Stack

### Frontend

- React.js
- React Router
- Context API
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Zod

### AI Integration

- Google Gemini API
- Gemini 3 Flash Preview Model

### Resume PDF Generation

- Puppeteer library to generate AI resume based on self description and job description

---
## Application Screenshots

<p align="center">
  <img src="./screenshots/homeDashboard.bmp" width="45%" />
  <img src="./screenshots/interviewDashboard.bmp" width="45%" />
</p>

## Project Structure

```bash
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── package.json
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone <https://github.com/rana-ji0001/CognitiveEdge>
cd project-root
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

---

## Workflow

1. User creates an account or logs in.
2. User uploads their resume.
3. User enters:
   - Job Description
   - Self Introduction / Profile Summary

4. The backend validates data using Zod.
5. Resume and user inputs are sent to Gemini AI.
6. Gemini generates a detailed interview report.
7. The report is displayed with actionable insights and interview preparation guidance.

---

## Security

- Passwords are hashed using bcrypt.
- Authentication handled through JWT tokens.
- Protected routes for authorized users.
- Server-side validation using Zod.

---

## Future Improvements

- PDF Report Export
- Interview Question Practice Mode
- AI Mock Interviews
- Resume Improvement Suggestions
- Report History Dashboard
- Role-Based Recommendations

---

## Author

Karan Rana

MERN Stack Developer | DSA Enthusiast | AI Enthusiast
