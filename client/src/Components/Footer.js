import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1E88E5', color: 'white', py: 2, mt: 4 }}>
      <Typography variant="body1" align="center">
        &copy; 2024 Fishing App by Mikkel Fjeld All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Terms of Service</Link>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Contact Us</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
