import React, { useState } from "react";
import { 
  Alert, Box, Button, CircularProgress, Divider, Grid, Paper, TextField, Typography, Container 
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Extend Button with motion
const MotionButton = motion(Button);

function Signup() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) return setError("Please enter your full name"), false;
    if (!email.trim()) return setError("Please enter your email address"), false;
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Please enter a valid email address"), false;
    if (!password) return setError("Please enter a password"), false;
    if (password.length < 6) return setError("Password must be at least 6 characters long"), false;
    if (password !== confirmPassword) return setError("Passwords do not match"), false;
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/signup", { email, password, name });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ email, name }));
      setSuccess("Signup successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Common TextField styling
  const textFieldSx = {
    "& .MuiOutlinedInput-root": { 
      borderRadius: 3, 
      background: alpha(theme.palette.background.paper, 0.95),
      transition: "all 0.4s ease",
      "&:hover": { 
        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
        borderColor: theme.palette.primary.main
      },
      "&.Mui-focused": { 
        boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
        borderColor: theme.palette.primary.main
      }
    },
    "& .MuiInputLabel-root": { 
      color: "text.secondary",
      transition: "all 0.3s ease",
      "&.Mui-focused": { color: theme.palette.primary.main }
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        sx={{ 
          minHeight: "100vh", 
          bgcolor: "background.default",
          background: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.08)}, ${alpha(theme.palette.background.default, 0.9)})`,
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
          <Paper 
            elevation={10} 
            sx={{ 
              p: { xs: 3, sm: 4, md: 5 }, 
              borderRadius: { xs: 3, md: 4 }, 
              bgcolor: "background.paper",
              boxShadow: `0 16px 48px ${alpha(theme.palette.primary.main, 0.15)}`,
              transition: "all 0.4s ease",
              "&:hover": { 
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.25)}`,
                transform: "translateY(-6px)"
              },
              overflow: "hidden",
              width: "100%"
            }}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: "center", p: { xs: 1, md: 2 } }}>
              <Typography 
                variant="h3" 
                component={motion.h1}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{ 
                  fontWeight: "bold",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 3px 6px rgba(0,0,0,0.1)",
                  lineHeight: 1.2,
                  fontSize: { xs: "2rem", sm: "2.2rem", md: "2.5rem" }
                }}
              >
                Create an Account
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                component={motion.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                sx={{ 
                  mt: 2, 
                  fontWeight: 400, 
                  textShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  maxWidth: "80%",
                  mx: "auto"
                }}
              >
                Join MindCare and embark on your wellness journey
              </Typography>
            </Box>
            
            <Box 
              sx={{ 
                maxWidth: "85%", 
                mx: "auto",
                width: "100%"
              }}
            >
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.error.light, 0.1),
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.success.light, 0.1),
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {success}
                </Alert>
              )}
              
              <form 
                onSubmit={handleSignup} 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 20,
                  width: "100%"
                }}
              >
                <TextField 
                  label="Full Name" 
                  variant="outlined" 
                  fullWidth 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={loading}
                  sx={textFieldSx}
                  InputProps={{
                    sx: { borderRadius: 3 }
                  }}
                />
                <TextField 
                  label="Email Address" 
                  variant="outlined" 
                  type="email" 
                  fullWidth 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={loading}
                  sx={textFieldSx}
                  InputProps={{
                    sx: { borderRadius: 3 }
                  }}
                />
                <TextField 
                  label="Password" 
                  variant="outlined" 
                  type="password" 
                  fullWidth 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  disabled={loading}
                  helperText="Password must be at least 6 characters long"
                  FormHelperTextProps={{ sx: { color: "text.secondary" } }}
                  sx={textFieldSx}
                  InputProps={{
                    sx: { borderRadius: 3 }
                  }}
                />
                <TextField 
                  label="Confirm Password" 
                  variant="outlined" 
                  type="password" 
                  fullWidth 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  disabled={loading}
                  sx={textFieldSx}
                  InputProps={{
                    sx: { borderRadius: 3 }
                  }}
                />
                <MotionButton 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large" 
                  sx={{ 
                    mt: 4, 
                    py: 1.8, 
                    bgcolor: "primary.main", 
                    "&:hover": { 
                      bgcolor: "primary.dark", 
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.35)}`,
                    },
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                    transition: "all 0.4s ease",
                    fontSize: "1rem"
                  }}
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign Up"}
                </MotionButton>
              </form>
              
              <Divider 
                sx={{ 
                  my: 4, 
                  borderColor: alpha(theme.palette.divider, 0.2),
                  borderWidth: 1.5,
                  width: "100%"
                }}
              >
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  component={motion.span}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  sx={{ 
                    px: 2, 
                    background: "background.paper",
                    fontWeight: 500
                  }}
                >
                  OR
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  component={motion.p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  sx={{ fontWeight: 400, mb: 2 }}
                >
                  Already have an account?
                </Typography>
                <MotionButton 
                  component={Link} 
                  to="/login" 
                  variant="outlined" 
                  sx={{ 
                    mt: 1, 
                    borderRadius: 3,
                    borderWidth: 1.5,
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": { 
                      bgcolor: alpha(theme.palette.primary.light, 0.15), 
                      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    },
                    transition: "all 0.4s ease",
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "none"
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Login
                </MotionButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;