import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import DetailItem from './DetailItem';

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
              <Grid item xs={12} s={12} sm={6} key={item.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${item.fishImagePath}`}
                    alt={item.typeOfCatch}
                    sx={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'contain',
                      
                     // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      marginBottom: '1em',
                      marginTop: '1em',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                    />
                  <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
                    <DetailItem label="Fish" value={item.typeOfFish} />
                    <DetailItem label="Size" value={item.size} />
                    <DetailItem label="Weight" value={item.weight} />
                    <DetailItem label="Lure used" value={item.typeOfLure} />
                    <DetailItem label="Date caught" value={new Date(item.catchDateTime).toLocaleString('no-NO')} />
                  </CardContent>
                    <Box sx={{ display: 'flex', paddingTop: 2, marginBottom: '2em', justifyContent: 'center'}}>
                      <Button size='small' variant='contained' color='secondary' onClick={() => deleteCatch(item.id)}>
                        Delete Catch
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
