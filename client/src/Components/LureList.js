import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

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
              <Grid item xs={12} sm={6} key={lure.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${lure.lureImagePath}`}
                    alt={lure.typeOfLure}
                    sx={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                  />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h6">{`Type: ${lure.typeOfLure}`}</Typography>
                  </CardContent>
                  <Box sx={{ padding: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => deleteLure(lure.id)}>
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default LureList;
