import React, { useState } from 'react';
import { Container, Paper, Box, Typography, Button } from '@mui/material';
import FishForm from './FishForm';
import FishList from './FishList';

const FishPage = () => {
  const [refreshFish, setRefreshFish] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(true);

  const handleFishAdded = () => {
    setRefreshFish((prev) => !prev);
    setIsDataVisible(true);
  };

  const toggleVisibility = () => {
    setIsDataVisible((prev) => !prev);
  };

  return (
    <Container maxWidth= "lg" style={{ marginTop: '40px' }}>
      <Paper elevation={2}>
        <Box p={3}>
          <Typography variant="h4" align='center' gutterBottom>
            Register a Catch
          </Typography>
          <FishForm onFishAdded={handleFishAdded} />
          <Box m={2} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={toggleVisibility}
              sx={{ mt: 2 }}
            >
              {isDataVisible ? 'Hide Fish' : 'Show Fish'}
            </Button>
          </Box>
          <FishList refreshFish={refreshFish} isDataVisible={isDataVisible} />
        </Box>
      </Paper>
    </Container>
  );
};

export default FishPage;
