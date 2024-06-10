import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

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
        <Paper elevation={0} sx={{ marginTop: 2, marginBottom: 2, padding: 2, width: '100%' }}>
          <Grid container spacing={2}>
            {fish.map((fish) => (
              <Grid item xs={12} sm={6} key={fish.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${fish.fishImagePath}`}
                    alt={fish.typeOfFish}
                    sx={{width: '100%', height: '150px', objectFit: 'contain', marginBottom: '1em', marginTop: '2em'}}
                    />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Type: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{fish.typeOfFish}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Size: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{fish.size}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Weight: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{fish.weight}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Lure used: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{fish.typeOfLure}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Date caught: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{new Date(fish.catchDateTime).toLocaleString('no-NO')}</Box>
                    </Typography>
                  </CardContent>
                    <Box sx={{ paddingTop: 2, marginBottom: '2em'}}>
                      <Button variant='contained' color='secondary' onClick={() => deleteFish(fish.id)}>
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

export default FishList;
