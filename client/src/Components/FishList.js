import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, ListItem, ListItemText, Grid, Button } from '@mui/material';

const FishList = ({ refreshFish, isDataVisible }) => {
  const [fish, setFish] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDataVisible) {
      fetchFish();
    }
  }, [refreshFish, isDataVisible]);

  const fetchFish = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/fish');
      if (!response.ok) {
        throw new Error('Failed to fetch fish');
      }
      const data = await response.json();
      setFish(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteFish = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/fish/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete fish');
      }
      setFish(fish.filter((fish) => fish.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box m={2} display="flex" flexDirection="column" alignItems="center">
      {error && <Typography color="error">{error}</Typography>}
      {isDataVisible && (
        <Paper elevation={1} sx={{ marginTop: 2, marginBottom: 2, padding: 2, width: '100%' }}>
          <Grid container spacing={2}>
            {fish.map((fish) => (
              <Grid item xs={12} sm={6} key={fish.id}>
                <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ListItemText primary={`Type: ${fish.typeOfFish}`} />
                  <ListItemText primary={`Size: ${fish.size}`} />
                  <ListItemText primary={`Weight: ${fish.weight}`} />
                  <ListItemText primary={`Lure used: ${fish.typeOfLure}`} />
                  <ListItemText primary={`Date caught: ${new Date(fish.catchDateTime).toLocaleString('no-NO')}`} />
                  <img
                    src={`http://localhost:5000/${fish.fishImagePath}`}
                    alt={fish.typeOfFish}
                    width="250"
                    height="175"
                    style={{ marginBottom: '10px' }}
                  />
                  <Button variant="contained" color="secondary" onClick={() => deleteFish(fish.id)}>
                    Delete
                  </Button>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default FishList;
