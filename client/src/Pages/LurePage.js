import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import LureForm from '../Components/LureForm';
import LureList from '../Components/LureList';
import PageWrapper from '../Components/PageWrapper';

const LurePage = () => {

  const [refresh, setRefresh] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(false);

  const handleLureAdded = () => {
    setRefresh((prev) => !prev);
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
              Register a Lure
            </Typography>
            <LureForm onLureAdded={handleLureAdded} />
            {/*
            <Box m={2} display="flex" flexDirection="column" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                onClick={toggleVisibility}
                sx={{ mt: 2 }}
              >
                {isDataVisible ? 'Hide Lures' : 'Show Lures'}
              </Button>
            </Box>
            
            <LureList refresh={refresh} isDataVisible={isDataVisible} />
            */}
          </Box>
      </Container>
    </PageWrapper>
  );
};

export default LurePage;
