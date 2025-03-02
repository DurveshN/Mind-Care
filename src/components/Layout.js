import React from "react";
import { 
  AppBar, Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, Switch, Tooltip
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { 
  Menu, Home, Dashboard as DashboardIcon, Psychology, Person, Logout,
  Brightness4, Brightness7
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { alpha } from "@mui/material";

const MotionIconButton = motion(IconButton);
const MotionListItemButton = motion(ListItemButton);

const Layout = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;
  const { darkMode, toggleDarkMode } = useThemeContext();

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", requiresAuth: true },
    { text: "Chat with AI", icon: <Psychology />, path: "/chatbot", requiresAuth: true },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isLoggedIn)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDrawerOpen(false);
    navigate("/login");
  };

  const drawer = (
    <Box sx={{ width: 250, bgcolor: "background.paper", overflow: "hidden" }}>
      <Box 
        sx={{ 
          height: 64, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          padding: 2, 
          bgcolor: "primary.main",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
        }}
      >
        <Typography 
          variant="h6" 
          color="white"
          component={motion.span}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MindCare 🧠💡
        </Typography>
      </Box>
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                  },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    transform: "translateX(4px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ sx: { fontWeight: 500, color: theme.palette.text.primary } }}
                />
              </ListItemButton>
            </motion.div>
          </ListItem>
        ))}
        {isLoggedIn && (
          <ListItem disablePadding>
            <MotionListItemButton
              onClick={handleLogout}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: alpha(theme.palette.error.light, 0.1),
                  transform: "translateX(4px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                },
                py: 1.5,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ListItemIcon sx={{ color: theme.palette.error.main }}><Logout /></ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ sx: { fontWeight: 500, color: theme.palette.text.primary } }}
              />
            </MotionListItemButton>
          </ListItem>
        )}
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 2 }}>
            <Typography variant="body2" color="text.secondary">Dark Mode</Typography>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Switch 
                checked={darkMode} 
                onChange={toggleDarkMode} 
                icon={<Brightness7 sx={{ fontSize: 16, color: "#fff" }} />}
                checkedIcon={<Brightness4 sx={{ fontSize: 16, color: "#fff" }} />}
                color="primary"
              />
            </motion.div>
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          backdropFilter: "blur(12px)", 
          bgcolor: darkMode ? alpha("#1e1e1e", 0.9) : alpha("#ffffff", 0.9),
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      >
        <Toolbar>
          {!isDesktop && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton 
                color="inherit" 
                edge="start" 
                onClick={() => setDrawerOpen(!drawerOpen)} 
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            </motion.div>
          )}
          <Typography 
            variant="h6" 
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700, 
              color: darkMode ? "#fff" : "#333",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            MindCare
          </Typography>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton 
                onClick={toggleDarkMode} 
                color="inherit" 
                sx={{ mr: 2 }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </motion.div>
          {!isLoggedIn ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/login" 
                sx={{ ml: 1 }}
              >
                <Person />
              </IconButton>
            </motion.div>
          ) : (
            <MotionIconButton
              color="inherit" 
              onClick={handleLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logout />
            </MotionIconButton>
          )}
        </Toolbar>
      </AppBar>
      {isDesktop ? (
        <Drawer 
          variant="permanent" 
          sx={{ 
            width: 250, 
            flexShrink: 0, 
            [`& .MuiDrawer-paper`]: { 
              width: 250, 
              boxSizing: "border-box",
              boxShadow: `4px 0 10px ${alpha(theme.palette.grey[500], 0.05)}`,
              border: "none",
              bgcolor: "background.paper",
              zIndex: 1200, // Ensure it stays below AppBar but above content
            } 
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer 
          variant="temporary" 
          open={drawerOpen} 
          onClose={() => setDrawerOpen(false)} 
          sx={{ 
            width: 250, 
            flexShrink: 0, 
            [`& .MuiDrawer-paper`]: { 
              width: 250, 
              boxSizing: "border-box",
              boxShadow: `4px 0 20px ${alpha(theme.palette.grey[500], 0.1)}`,
              border: "none",
              bgcolor: "background.paper",
              zIndex: 1200,
            }
          }}
        >
          {drawer}
        </Drawer>
      )}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 1, md: 0 },         // Reduced padding from p: 2 to p: 1
          pl: { md: 0 },                
          pr: { md: 1 },                // Reduced from 3 to 1
          pt: { xs: 1, md: 1 },         // Reduced from 2/3 to 1
          pb: { xs: 1, md: 1 },         // Reduced from 2/3 to 1
          width: { sm: `calc(100% - 250px)` }, 
          ml: { md: "250px" }, 
          mt: "64px", 
          bgcolor: "background.default", 
          minHeight: "calc(100vh - 64px)",
          transition: "background-color 0.3s ease",
          overflow: "hidden"
        }}
      >
        <Container 
          maxWidth={false}              
          disableGutters={isDesktop}    
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            py: 0, // Changed from py: 3 to py: 0
            pl: { md: 1 } // Reduced from 3 to 1
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;