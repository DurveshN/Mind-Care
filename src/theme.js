import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6573c3", light: "#8a9cff", dark: "#4157a1" },
    secondary: { main: "#64b5f6", light: "#90caf9", dark: "#1e88e5" },
    success: { main: "#4caf50", light: "#81c784", dark: "#388e3c" },
    info: { main: "#2196f3", light: "#64b5f6", dark: "#1976d2" },
    warning: { main: "#ff9800", light: "#ffb74d", dark: "#f57c00" },
    error: { main: "#f44336", light: "#ef5350", dark: "#d32f2f" },
    background: { 
      default: "#f5f7fa", 
      paper: "#ffffff",
      subtle: "#f0f2f5"
    },
    text: { primary: "#333333", secondary: "#666666" },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: `0 12px 28px ${alpha("#000", 0.15)}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8a9cff", light: "#b3c5ff", dark: "#6573c3" },
    secondary: { main: "#90caf9", light: "#bbdefb", dark: "#64b5f6" },
    success: { main: "#66bb6a", light: "#81c784", dark: "#4caf50" },
    info: { main: "#42a5f5", light: "#64b5f6", dark: "#2196f3" },
    warning: { main: "#ffa726", light: "#ffb74d", dark: "#f57c00" },
    error: { main: "#ef5350", light: "#f44336", dark: "#d32f2f" },
    background: { 
      default: "#1e1e1e", 
      paper: "#2d2d2d",
      subtle: "#3a3a3a"
    },
    text: { primary: "#ffffff", secondary: "#b0b0b0" },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: `0 12px 28px ${alpha("#000", 0.25)}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

export default function getTheme(darkMode) {
  return darkMode ? darkTheme : lightTheme;
}