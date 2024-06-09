import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 5, backgroundColor: '#F0F0F0' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Fishing App
      </Typography>
      <Typography variant="h6" gutterBottom>
        Datadriven approach to fishing
      </Typography>
    </Box>
  );
};

export default HomePage;
