import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

const CatchList = ({ refreshCatch, isDataVisible }) => {
  const [catchList, setCatchList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDataVisible) {
      fetchCatch();
    }
  }, [refreshCatch, isDataVisible]);

  const fetchCatch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/catch');
      if (!response.ok) {
        throw new Error('Failed to fetch catch');
      }
      const data = await response.json();
      setCatchList(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCatch = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/catch/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete catch');
      }
      setCatchList(catchList.filter((item) => item.id !== id));
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
            {catchList.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${item.fishImagePath}`}
                    alt={item.typeOfCatch}
                    sx={{width: '100%', height: '150px', objectFit: 'contain', marginBottom: '1em', marginTop: '2em'}}
                    />
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Type: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{item.typeOfCatch}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Size: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{item.size}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Weight: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{item.weight}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Lure used: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{item.typeOfLure}</Box>
                    </Typography>
                    <Typography variant="h6">
                      <Box component="span" sx={{ fontWeight: 600 }}>{`Date caught: `}</Box>
                      <Box component="span" sx={{ fontWeight: 400 }}>{new Date(item.catchDateTime).toLocaleString('no-NO')}</Box>
                    </Typography>
                  </CardContent>
                    <Box sx={{ paddingTop: 2, marginBottom: '2em'}}>
                      <Button variant='contained' color='secondary' onClick={() => deleteCatch(item.id)}>
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

export default CatchList;
