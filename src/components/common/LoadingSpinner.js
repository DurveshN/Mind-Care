import React, { useContext } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Loading..." }) => {
  const { mode } = useContext(ThemeContext);
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 150px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgress 
          thickness={4}
          size={60}
          sx={{ 
            color: mode === 'dark' ? 'primary.light' : 'primary.main',
            filter: mode === 'dark' ? 'drop-shadow(0 0 8px rgba(141, 152, 212, 0.5))' : 'none'
          }} 
        />
      </motion.div>
      <Typography 
        component={motion.p}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{ 
          mt: 3, 
          color: 'text.secondary',
          fontWeight: 500
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;