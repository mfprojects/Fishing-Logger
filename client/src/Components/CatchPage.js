import React, { useState } from 'react';
import { Container, Paper, Box, Typography, Button } from '@mui/material';
import CatchForm from './CatchForm';
import CatchList from './CatchList';

const CatchPage = () => {
  const [refreshCatch, setRefreshCatch] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(true);

  const handleCatchAdded = () => {
    setRefreshCatch((prev) => !prev);
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
          <CatchForm onCatchAdded={handleCatchAdded} />
          <Box m={2} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={toggleVisibility}
              sx={{ mt: 2 }}
            >
              {isDataVisible ? 'Hide Catches' : 'Show Catches'}
            </Button>
          </Box>
          <CatchList refreshCatch={refreshCatch} isDataVisible={isDataVisible} />
        </Box>
      </Paper>
    </Container>
  );
};

export default CatchPage;
