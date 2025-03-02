import React, { useContext } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ThemeContext } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const theme = useTheme();
  
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        component={motion.button}
        whileHover={{ 
          scale: 1.1, 
          rotate: 15 
        }}
        whileTap={{ 
          scale: 0.9 
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {mode === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;