import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import "./styles/index.css";
import { ThemeContextProvider } from "./context/ThemeContext";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>
        <CssBaseline />
        <App />
      </ThemeContextProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);