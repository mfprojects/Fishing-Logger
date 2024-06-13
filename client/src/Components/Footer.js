import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1E88E5', color: 'white', py: 4, mt: 0 }}>
      <Typography variant="body1" align="center">
        &copy; 2024 Fishing App by Mikkel Fjeld.
      </Typography>
    </Box>
  );
};

export default Footer;
