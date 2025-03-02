import React from 'react';
import { Card, CardContent, CardHeader, CardActions } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  header, 
  actions, 
  delay = 0, 
  hover = true,
  sx = {},
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: delay * 0.1
      }}
      whileHover={hover ? { y: -5 } : {}}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          ...sx
        }}
        {...props}
      >
        {header && <CardHeader {...header} />}
        <CardContent sx={{ flexGrow: 1 }}>
          {children}
        </CardContent>
        {actions && <CardActions>{actions}</CardActions>}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;