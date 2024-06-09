import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Welcome to FishApp
          </Typography>
          <Typography variant="body1" paragraph>
            Start by adding a catch under the fish menu or begin registering your lures under the Lures menu.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
