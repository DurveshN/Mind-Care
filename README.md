


# 🧠 MindCare AI Backend

This project serves as the backend service for the **MindCare AI Mental Health Chatbot**. Built using **Express.js**, the **Firebase Admin SDK**, and **Google Gemini AI**, it handles user signup and processes AI chat requests.

---

## 📌 Project Overview

MindCare AI is an AI-powered chatbot designed to provide motivational support and mental health guidance. The backend exposes secure API endpoints for user management and AI-powered responses. Key features include:

- **User Signup:** Create new users with email and password using Firebase.
- **AI Chatbot:** Send user messages to Google Gemini AI to receive intelligent responses.
- **Secure API:** Built with Express.js and configured via environment variables.

---

## 🛠 Tech Stack
   Component         | Technology Used          |
 |-------------------|--------------------------|
 | **Backend**       | Node.js, Express.js, Firebase Admin SDK, Google Gemini AI |
 | **Environment Management** | dotenv |
 | **API Testing**   | Postman / cURL          |

---

## 📂 Folder Structure

```plaintext
mindcare-project/
│── backend/               # Backend code
│   ├── config/            # Configuration files
│   │   ├── firebaseAdmin.js   # Firebase Admin configuration
│   │   ├── gemini.js          # Google Gemini AI integration
│   ├── routes/            # API routes
│   │   ├── authRoutes.js      # User authentication routes (signup)
│   │   ├── aiRoutes.js        # AI chatbot routes
│   ├── server.js          # Main Express.js server
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies
│   ├── README.md          # This documentation
🚀 Installation & Setup
1. Clone the Repository
Clone the repository and navigate to the backend folder:

Copy
git clone <repository_url>
cd mindcare-project/backend
2. Install Dependencies
Install the necessary dependencies:

Copy
npm install
3. Create & Configure the .env File
Create a file named .env in the backend folder and add your credentials:

Copy
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
GEMINI_API_KEY=your_gemini_api_key
Replace the placeholder values with your actual Firebase and Gemini API credentials.

4. Run the Server
Start the server:

Copy
node server.js
The server will start on http://localhost:5000/.

📡 API Endpoints
Method	Endpoint	Description
GET	/	Check if the backend is running
POST	/auth/signup	Create a new user (email & password)
POST	/auth/login	Not implemented: Use Firebase Client SDK for login
POST	/chatbot/ai-chat	Send user message to Gemini AI and receive a reply
🛠 Troubleshooting
Server Not Starting: Verify your .env file is correctly configured and all dependencies are installed.
AI Chatbot Errors: Ensure your GEMINI_API_KEY is valid and that your API key has access to the Gemini AI services.
🔮 Future Scope
User Login: Integrate Firebase Client SDK on the frontend for user login.
Voice Input: Allow users to interact with the chatbot using voice.
Emotion Analysis: Enhance AI responses with sentiment/emotion detection.
Deployment: Host the backend on a cloud platform (e.g., Render or Heroku).
