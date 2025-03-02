import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import { alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MotionButton = motion(Button);

function Chatbot() {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post("/ai-chat", { userMessage: input });
      const aiMessage = { text: response.data.reply, sender: "ai", timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Error getting response", sender: "ai", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "calc(100vh - 128px)", 
        maxWidth: 800, 
        mx: "auto",
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 0.8)})`,
        borderRadius: 3,
        p: 3
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Typography 
        variant="h4" 
        gutterBottom
        component={motion.h1}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          fontWeight: "bold",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Chat with MindCare AI
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          flexGrow: 1, 
          p: 2, 
          mb: 2, 
          overflowY: "auto", 
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.25)}` }
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.map((msg, index) => (
          <Box 
            key={index} 
            sx={{ 
              mb: 2, 
              display: "flex", 
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" 
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Box 
              sx={{ 
                maxWidth: "70%", 
                p: 2, 
                borderRadius: 2, 
                bgcolor: msg.sender === "user" ? "primary.main" : alpha(theme.palette.secondary.light, 0.1), 
                color: msg.sender === "user" ? "white" : "text.primary", 
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": { boxShadow: `0 6px 18px ${alpha(theme.palette.primary.main, 0.3)}` }
              }}
            >
              <Typography>{msg.text}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>{msg.timestamp.toLocaleTimeString()}</Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Box 
        component="form" 
        onSubmit={(e) => { e.preventDefault(); sendMessage(); }} 
        sx={{ display: "flex", gap: 2 }}
      >
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Type your message..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          disabled={loading}
          sx={{ 
            "& .MuiOutlinedInput-root": { 
              borderRadius: 2, 
              background: "background.paper",
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}` }
            }
          }}
        />
        <MotionButton 
          type="submit" 
          variant="contained" 
          disabled={loading} 
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          sx={{ 
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark", boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}` },
            borderRadius: 2,
            transition: "all 0.3s ease"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </MotionButton>
      </Box>
    </Box>
  );
}

export default Chatbot;