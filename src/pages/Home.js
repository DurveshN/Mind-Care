import React from "react";
import { Box, Button, Card, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { alpha } from "@mui/material";
import heroImage from "../assets/mental-health-illustration.svg";

const MotionButton = motion(Button);

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLoggedIn = localStorage.getItem("token") !== null;

  const features = [
    { title: "AI-Powered Support", description: "Engage with our AI assistant anytime for personalized support or guidance." },
    { title: "Personalized Insights", description: "Receive tailored insights based on your interactions and progress tracking." },
    { title: "Private & Secure", description: "Your data is encrypted and confidential, prioritizing your privacy at all times." },
  ];

  return (
    <Box 
      sx={{ 
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 0.8)})`,
        borderRadius: 3,
        p: 0, // Reduced from p: 3 to eliminate extra padding
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box 
        sx={{ 
          py: 8, 
          width: "100%",
          borderRadius: 4, 
          background: `linear-gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
          color: "white", 
          mb: 0, // Removed bottom margin (changed from mb: 6)
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
          overflow: "hidden",
          textAlign: "center"
        }}
      >
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Typography 
                variant="h1" 
                component={motion.h1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: "2rem", md: "2.5rem" }, 
                  fontWeight: "bold",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                Welcome to MindCare
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9, 
                  fontWeight: 400,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
                component={motion.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Your companion for mental wellness and self-care
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                {!isLoggedIn ? (
                  <>
                    <MotionButton
                      component={Link}
                      to="/signup"
                      variant="contained"
                      size="large"
                      sx={{ 
                        bgcolor: "white", 
                        color: "primary.main", 
                        "&:hover": { 
                          bgcolor: alpha("#ffffff", 0.9), 
                          boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                          transform: "scale(1.05)"
                        },
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        transition: "all 0.3s ease"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </MotionButton>
                    <MotionButton
                      component={Link}
                      to="/login"
                      variant="outlined"
                      size="large"
                      sx={{ 
                        borderColor: "white", 
                        color: "white", 
                        "&:hover": { 
                          borderColor: "white", 
                          bgcolor: alpha("#ffffff", 0.1), 
                          boxShadow: `0 4px 15px ${alpha(theme.palette.secondary.main, 0.3)}`,
                          transform: "scale(1.05)"
                        },
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        transition: "all 0.3s ease"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </MotionButton>
                  </>
                ) : (
                  <MotionButton
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    sx={{ 
                      bgcolor: "white", 
                      color: "primary.main", 
                      "&:hover": { 
                        bgcolor: alpha("#ffffff", 0.9), 
                        boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transform: "scale(1.05)"
                      },
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      transition: "all 0.3s ease"
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Dashboard
                  </MotionButton>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <motion.img 
                src={heroImage} 
                alt="Mental health illustration" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ 
                  width: "100%", 
                  maxWidth: 400, 
                  margin: "auto", 
                  display: "block", 
                  borderRadius: 12,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.grey[500], 0.2)}`
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ mt: 0, mb: 4 }}> {/* Changed from mb: 8 to mb: 4 and added mt: 0 */}
        <Typography 
          variant="h3" 
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          textAlign="center" 
          gutterBottom
          sx={{ 
            mt: 2, // Added small top margin
            mb: 4, // Reduced from mb: 6
            color: "text.primary",
            fontWeight: "bold",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          How MindCare Can Help You
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  p: 4, 
                  height: "100%",   
                  display: "flex", 
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                  "&:hover": { 
                    boxShadow: `0 12px 28px ${alpha(theme.palette.secondary.main, 0.25)}`,
                    transform: "translateY(-8px)"
                  },
                  transition: "all 0.3s ease"
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom 
                  sx={{ 
                    color: "primary.main", 
                    fontWeight: "bold",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  component={motion.p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;