import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import StyledCard from './StyledCard';
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
        <Paper elevation={0} sx={{ marginTop: 2, marginBottom: 2, padding: 2, width: '100%', backgroundColor: 'transparent' }}>
          <Grid container spacing={2}>
            {catchList.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <StyledCard
                  image={`http://localhost:5000/${item.fishImagePath}`}
                  alt={item.typeOfCatch}
                  details={
                    <>
                      <DetailItem label="Fish" value={item.typeOfFish} />
                      <DetailItem label="Size" value={item.size} />
                      <DetailItem label="Weight" value={item.weight} />
                      <DetailItem label="Lure used" value={item.typeOfLure} />
                      <DetailItem label="Date caught" value={new Date(item.catchDateTime).toLocaleString('no-NO')} />
                      <DetailItem label="Location" value={item.locationName} />
                      
                    </>
                  }
                  onDelete={() => deleteCatch(item.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default CatchList;
