import React, { useState, useEffect } from "react";
import { 
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography, 
  LinearProgress, List, ListItem, ListItemText, ListItemIcon, 
  Avatar, useTheme, alpha
} from "@mui/material";
import { 
  Chat, InsertChart, EmojiEmotions, Schedule, Insights,
  SelfImprovement, NaturePeople, Create, DirectionsWalk
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moodData, setMoodData] = useState([]);
  
  const getMoodColor = (level) => {
    if (level >= 8) return theme.palette.success.main;
    if (level >= 6) return theme.palette.info.main;
    if (level >= 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userInfo);
    setTimeout(() => {
      setMoodData([
        { day: "Mon", level: 7 }, { day: "Tue", level: 6 }, { day: "Wed", level: 8 },
        { day: "Thu", level: 5 }, { day: "Fri", level: 7 }, { day: "Sat", level: 9 }, { day: "Sun", level: 8 }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const insights = [
    "You've been consistently tracking your mood this week. Great job!",
    "Your mood tends to improve on weekends. Consider what activities bring you joy.",
    "Try scheduling short mindfulness breaks during your workday."
  ];

  const activityIcons = [
    <SelfImprovement color="primary" />,
    <Create color="secondary" />,
    <DirectionsWalk sx={{ color: theme.palette.success.main }} />,
    <NaturePeople sx={{ color: theme.palette.warning.main }} />
  ];

  const suggestions = [
    "5-minute mindfulness meditation",
    "Journaling exercise",
    "Breathing technique for stress relief",
    "Quick walk outside"
  ];

  if (loading) return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <LinearProgress sx={{ 
        height: 8, 
        borderRadius: 4,
        "& .MuiLinearProgress-bar": {
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
        }
      }} />
      <Typography sx={{ mt: 2, color: "text.secondary" }}>Loading your wellness journey...</Typography>
    </Box>
  );

  return (
    <Box 
      sx={{ 
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.default, 0.8)})`,
        borderRadius: 3,
        p: 3
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component={motion.h1}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          gutterBottom
          sx={{ 
            fontWeight: "bold",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Welcome back, {user?.name || "Friend"}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Here's your mental wellness overview for today
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: "100%", 
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
              transition: "all 0.3s ease",
              overflow: "hidden",
              "&:hover": {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.25)}`,
                transform: "translateY(-5px)"
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader 
              title="Quick Actions" 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.light, 0.1),
                "& .MuiTypography-root": { fontWeight: 600 }
              }} 
            />
            <Divider />
            <CardContent>
              <List>
                <ListItem 
                  button 
                  component={Link} 
                  to="/chatbot" 
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1.5, 
                    p: 1.5,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    "&:hover": { 
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "white", 
                      transform: "scale(1.02)" 
                    },
                    transition: "all 0.3s ease"
                  }}
                  components={motion.li}
                  whileHover={{ scale: 1.02 }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.9) }}>
                      <Chat />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Talk to AI Assistant" 
                    secondary="Share your thoughts and get support"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem 
                  button 
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1.5, 
                    p: 1.5,
                    bgcolor: alpha(theme.palette.secondary.light, 0.05),
                    "&:hover": { 
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                      color: "white", 
                      transform: "scale(1.02)" 
                    },
                    transition: "all 0.3s ease"
                  }}
                  component={motion.li}
                  whileHover={{ scale: 1.02 }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.9) }}>
                      <EmojiEmotions />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Track Today's Mood" 
                    secondary="Log how you're feeling right now"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem 
                  button 
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1, 
                    p: 1.5,
                    bgcolor: alpha(theme.palette.success.light, 0.05),
                    "&:hover": { 
                      background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                      color: "white", 
                      transform: "scale(1.02)" 
                    },
                    transition: "all 0.3s ease"
                  }}
                  component={motion.li}
                  whileHover={{ scale: 1.02 }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.9) }}>
                      <Schedule />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Schedule Session" 
                    secondary="Plan time for your wellness"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.info.main, 0.15)}`,
              transition: "all 0.3s ease",
              overflow: "hidden",
              "&:hover": {
                boxShadow: `0 12px 28px ${alpha(theme.palette.info.main, 0.25)}`,
                transform: "translateY(-5px)"
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader 
              title="Weekly Mood Tracker" 
              action={
                <Button 
                  variant="outlined"
                  color="info"
                  startIcon={<InsertChart />}
                  sx={{ 
                    borderRadius: 4,
                    px: 2,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.info.main, 0.2)}`,
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Details
                </Button>
              }
              sx={{ 
                bgcolor: alpha(theme.palette.info.light, 0.1),
                "& .MuiTypography-root": { fontWeight: 600 }
              }}
            />
            <Divider />
            <CardContent sx={{ pt: 4 }}>
              <Box sx={{ height: 180, display: "flex", alignItems: "flex-end", px: 2 }}>
                {moodData.map((item, index) => {
                  const moodColor = getMoodColor(item.level);
                  return (
                    <Box 
                      key={index} 
                      sx={{ 
                        flex: 1, 
                        mx: 1, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        position: "relative"
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          position: "absolute", 
                          top: 5, 
                          color: moodColor,
                          fontWeight: "bold" 
                        }}
                      >
                        {item.level}
                      </Typography>
                      <Box 
                        component={motion.div}
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.level / 10) * 100}%` }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                        sx={{ 
                          width: "100%", 
                          backgroundImage: `linear-gradient(to top, ${moodColor}, ${alpha(moodColor, 0.6)})`,
                          borderRadius: "8px 8px 0 0", 
                          boxShadow: `0 4px 12px ${alpha(moodColor, 0.3)}`,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "30%",
                            background: `linear-gradient(to bottom, ${alpha('#ffffff', 0.3)}, transparent)`,
                            borderRadius: "8px 8px 0 0",
                          }
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mt: 1, 
                          fontWeight: 500,
                          color: item.level > 7 ? 'success.dark' : 
                                 item.level > 5 ? 'info.dark' : 
                                 item.level > 3 ? 'warning.dark' : 'error.dark'
                        }}
                      >
                        {item.day}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box 
                sx={{ 
                  mt: 3, 
                  pt: 2, 
                  borderTop: `1px dashed ${alpha(theme.palette.text.secondary, 0.2)}`,
                  textAlign: "center"
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Your average mood this week: 
                  <Typography 
                    component="span" 
                    sx={{ 
                      fontWeight: "bold", 
                      color: getMoodColor(7.1),
                      px: 1
                    }}
                  >
                    7.1/10
                  </Typography>
                  — Better than last week!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
              transition: "all 0.3s ease",
              overflow: "hidden",
              "&:hover": {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.25)}`,
                transform: "translateY(-5px)"
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader 
              title="AI Insights" 
              avatar={
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`
                  }}
                >
                  <Insights />
                </Avatar>
              }
              sx={{ 
                bgcolor: alpha(theme.palette.primary.light, 0.1),
                "& .MuiTypography-root": { fontWeight: 600 }
              }}
            />
            <Divider />
            <CardContent>
              <List sx={{ p: 0 }}>
                {insights.map((insight, index) => (
                  <ListItem 
                    key={index}
                    component={motion.li}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                    sx={{ 
                      py: 1.5, 
                      px: 2, 
                      mb: 1, 
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.light, index * 0.02 + 0.03),
                      "&:hover": { bgcolor: alpha(theme.palette.primary.light, index * 0.02 + 0.06) }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: theme.palette.primary.main }}>•</ListItemIcon>
                    <ListItemText 
                      primary={insight} 
                      primaryTypographyProps={{ 
                        variant: "body2", 
                        color: alpha(theme.palette.text.primary, 0.9) 
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button 
                  variant="text" 
                  color="primary"
                  component={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  sx={{ 
                    borderRadius: 4,
                    py: 0.5, 
                    px: 3,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`
                    }
                  }}
                >
                  Get More Insights
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: "100%",
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.15)}`,
              transition: "all 0.3s ease",
              overflow: "hidden",
              "&:hover": {
                boxShadow: `0 12px 28px ${alpha(theme.palette.secondary.main, 0.25)}`,
                transform: "translateY(-5px)"
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CardHeader 
              title="Suggested Activities" 
              avatar={
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.secondary.main,
                    boxShadow: `0 4px 8px ${alpha(theme.palette.secondary.main, 0.3)}`
                  }}
                >
                  <SelfImprovement />
                </Avatar>
              }
              sx={{ 
                bgcolor: alpha(theme.palette.secondary.light, 0.1),
                "& .MuiTypography-root": { fontWeight: 600 }
              }}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {suggestions.map((suggestion, index) => (
                  <Grid item xs={6} key={index}>
                    <Button 
                      variant="outlined" 
                      color={
                        index === 0 ? "primary" : 
                        index === 1 ? "secondary" : 
                        index === 2 ? "success" : "warning"
                      }
                      startIcon={activityIcons[index]}
                      sx={{ 
                        width: "100%", 
                        height: "100%", 
                        py: 1.5, 
                        px: 1,
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        textAlign: "center",
                        borderRadius: 2,
                        borderWidth: 2,
                        gap: 1,
                        "&:hover": { 
                          bgcolor: index === 0 ? alpha(theme.palette.primary.main, 0.9) : 
                                   index === 1 ? alpha(theme.palette.secondary.main, 0.9) : 
                                   index === 2 ? alpha(theme.palette.success.main, 0.9) : 
                                   alpha(theme.palette.warning.main, 0.9),
                          color: "white", 
                          transform: "scale(1.05)" 
                        },
                        transition: "all 0.3s ease"
                      }}
                      component={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {suggestion}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button 
                  variant="text" 
                  color="secondary"
                  component={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  sx={{ 
                    borderRadius: 4,
                    py: 0.5, 
                    px: 3,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})`
                    }
                  }}
                >
                  View All Activities
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;