import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Alert, Box, Button, CircularProgress, Divider, Grid, Paper, TextField, Typography, Container } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Kept useLocation from your previous edit
import { motion } from "framer-motion";
import { alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { auth } from "./firebaseConfig"; // Corrected to single import, removed duplicate imports

// Extend Button with motion
const MotionButton = motion(Button);

function Login() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Added to check current route for auth state

  // Check if user is already authenticated on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && location.pathname === "/login") {
        navigate("/dashboard", { replace: true }); // Redirect to dashboard if already logged in
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [navigate, location.pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return setError("Please enter both email and password");
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // Store user data in localStorage
      navigate("/dashboard", { replace: true }); // Use replace to prevent back navigation issues
    } catch (err) {
      console.error("Login error:", err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with this email. Please sign up or check your email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many login attempts. Please try again later or reset your password.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;
        default:
          setError(err.message || "Login failed. Please try again.");
      }
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
                Welcome Back
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
                Sign in to continue your wellness journey
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

              <form
                onSubmit={handleLogin}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  width: "100%"
                }}
              >
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
                  aria-label="Email address input" // Added for accessibility
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  sx={textFieldSx}
                  InputProps={{
                    sx: { borderRadius: 3 }
                  }}
                  aria-label="Password input" // Added for accessibility
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                  <Link to="/forgot-password" style={{ textDecoration: "none" }}> {/* Updated to point to a route */}
                    <Typography
                      variant="body2"
                      color="primary"
                      component={motion.span}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      sx={{
                        transition: "all 0.3s ease",
                        "&:hover": { textDecoration: "underline" },
                        fontWeight: 500
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                </Box>

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
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.35)}`
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
                  aria-label="Login button" // Added for accessibility
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
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
                  Don't have an account?
                </Typography>
                <MotionButton
                  component={Link}
                  to="/signup"
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
                  aria-label="Sign up button" // Added for accessibility
                >
                  Sign Up
                </MotionButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;