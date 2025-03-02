const axios = require("axios");
require("dotenv").config(); // Load environment variables

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: message }] }] // Correct request format
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Extract response text correctly
    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "I'm here to help!";
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    return "Sorry, I couldn't process that request.";
  }
};

module.exports = { getAIResponse };
