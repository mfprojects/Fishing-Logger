import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import './Waves.css';  // Import the waves.css file
import PageWrapper from '../Components/PageWrapper';
import Typewriter from '../Components/TypeWriter';
const HomePage = () => {

  return (
    <PageWrapper>
      <Box sx={{
        py: { xs: 3, md: 5 }, 
        px: { xs: 2, md: 0 }, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '33vh', 
        textAlign: 'center', 
        maxWidth: '90%', // Adjust the width here
        margin: '0 auto' // Center the box horizontally
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.125rem' } }}>
          Welcome to the Fishing App
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
          <Typewriter text="Datadriven approach to fishing"delay={100}></Typewriter>
        </Typography>
      </Box>

      <Box sx={{ 
        width: '100%', 
        overflow: 'hidden', 
        lineHeight: 0, 
        position: 'absolute', 
        bottom: 0, left: 0 }}>
        <svg
          className="waves"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0,172,193,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0,172,193,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0,172,193,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(0,172,193,1)" />
          </g>
        </svg>
      </Box>
    </PageWrapper>
  );
};

export default HomePage;
