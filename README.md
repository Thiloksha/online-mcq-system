# 📝 Online MCQ Exam System (Mini Version)

This is a simple Online MCQ Exam System. The system allows students to:

- View available mock exam papers
- Attempt multiple-choice questions
- Submit answers and view their results

---

## 🚀 Tech Stack Used

**Frontend:**

- React  
- Axios  
- React Router DOM  

**Backend:**

- Node.js  
- Express.js  

**Database:**

- MongoDB (hosted via MongoDB Atlas)

---

## ✅ Features Implemented

- Static Login for Students  
- Display of Mock Exam Papers  
- MCQ Attempt (5 questions per paper)  
- Submit Answers and Get Immediate Feedback  
- Result Page (shows score, correct/incorrect responses)

---
## 🔐 Sample Login Credentials
- Static login only (no registration required)
```text
Email: student1@example.com  
Password: student123@
```
---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/online-mcq-system.git
cd online-mcq-system
```
### 2. Backend Setup
```bash
cd backend
npm install
```
#### Create a .env file in the backend folder with the following content:
```init
PORT=5000
MONGO_URI=mongodb+srv://thiloksha25:sliit25t@mcq-cluster.la64uy0.mongodb.net/mcq-cluster?retryWrites=true&w=majority&appName=mcq-cluster
```
#### Start the backend server:
```bash
npm start
```
### 3. Frontend Setup
```bash
cd frontend
npm install
```
#### Ensure this line is present in your frontend/package.json to enable proxying API calls:
```json
"proxy": "http://localhost:5000",
```
#### Start the frontend app:
```bash
npm start
```







