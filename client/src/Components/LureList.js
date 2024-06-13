import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import StyledCard from './StyledCard';

const LureList = ({ refresh, isDataVisible }) => {
  const [lures, setLures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDataVisible) {
      fetchLures();
    }
  }, [refresh, isDataVisible]);

  const fetchLures = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lures');
      if (!response.ok) {
        throw new Error('Failed to fetch lures');
      }
      const data = await response.json();
      setLures(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteLure = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/lures/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete lure: ${errorData.message}`);
      }
      setLures(lures.filter((lure) => lure.id !== id));
    } catch (error) {
      console.error('Delete Lure Error:', error);
      setError(error.message);
    }
  };

  return (
    <Box m={2} display="flex" flexDirection="column" alignItems="center">
      {error && <Typography color="error">{error}</Typography>}
      {isDataVisible && (
        <Paper elevation={0} sx={{ marginTop: 2, marginBottom: 2, padding: 2, width: '100%' }}>
          <Grid container spacing={2}>
            {lures.map((lure) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={lure.id}>
                <StyledCard
                  image={`http://localhost:5000/${lure.lureImagePath}`}
                  alt={lure.typeOfLure}
                  details={
                    <Typography variant="h6">{`Type: ${lure.typeOfLure}`}</Typography>
                  }
                  onDelete={() => deleteLure(lure.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default LureList;
