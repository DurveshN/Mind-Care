const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./firebaseAdmin"); // Firebase Admin SDK
const { getAIResponse } = require("./gemini"); // Gemini AI Integration

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// **Signup Route**
app.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    res.json({ message: "✅ Signup successful", userId: userRecord.uid });
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// **Login Route (Use Firebase Authentication in frontend)**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Firebase Admin does NOT support password verification.
    return res.status(400).json({ error: "Use Firebase Authentication SDK for login on the frontend." });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// **AI Chat Route**
app.post("/ai-chat", async (req, res) => {
  try {
    const { userMessage } = req.body;
    if (!userMessage) return res.status(400).json({ error: "Message is required" });

    const reply = await getAIResponse(userMessage);
    res.json({ reply });
  } catch (error) {
    console.error("❌ AI Chat Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));