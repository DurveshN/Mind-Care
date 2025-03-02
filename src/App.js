import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chatbot from "./components/Chatbot";
import { useThemeContext } from "./context/ThemeContext";
import getTheme from "./theme";
import { ThemeProvider } from "@emotion/react";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const { darkMode } = useThemeContext();
  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;