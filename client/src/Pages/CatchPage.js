import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import CatchForm from '../Components/CatchForm';
import CatchList from '../Components/CatchList';
import PageWrapper from '../Components/PageWrapper';

const CatchPage = () => {
  const [refreshCatch, setRefreshCatch] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(false);

  const handleCatchAdded = () => {
    setRefreshCatch((prev) => !prev);
    setIsDataVisible(true);
  };

  const toggleVisibility = () => {
    setIsDataVisible((prev) => !prev);
  };

  return (
    
    <PageWrapper>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
          <Box p={3}>
            <Typography variant="h2" align='center' gutterBottom>
              Register a Catch
            </Typography>
            
            <CatchForm onCatchAdded={handleCatchAdded} />
            {/*
            <Box m={2} display="flex" flexDirection="column" alignItems="center">
              
              <Button
                variant="contained"
                color="primary"
                onClick={toggleVisibility}
                sx={{ mt: 2 }}
              >
                {isDataVisible ? 'Hide Recent Catches' : 'Show Recent Catches'}
              </Button>
              
            </Box>
            <CatchList refreshCatch={refreshCatch} isDataVisible={isDataVisible} />
           */}
          </Box>
          
      </Container>
    </PageWrapper>
  );
};

export default CatchPage;
