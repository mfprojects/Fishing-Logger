import React from 'react';
import { Box, useTheme } from '@mui/material';

const PageWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        textAlign: 'center', 
        position: 'relative',
        background: theme.gradients.frontPage,
        //paddingTop: '64px'
      }}>
      {children}
    </Box>
  );
};

export default PageWrapper;
