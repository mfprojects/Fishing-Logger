import React, { useState } from 'react';
import { Box, Button, Typography, Paper, ListItem, ListItemText, Grid } from '@mui/material';

const LureList = ({ onLureAdded }) => {
  const [lures, setLures] = useState([]);
  const [error, setError] = useState(null);

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
        throw new Error('Failed to delete lure');
      }
      setLures(lures.filter((lure) => lure.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box m={20} display="flex" flexDirection="column" alignItems="center">
      <Button variant="contained" color="primary" onClick={fetchLures}>
        Show Lures
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <Paper elevation={1} sx={{ marginTop: 2, marginBottom: 2, padding: 2, width: '100%'}}>
        <Grid container spacing={2}>
          {lures.map((lure) => (
            <Grid item xs={12} sm={6} key={lure.id}>
              <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ListItemText primary={`Type: ${lure.typeOfLure}`} />
                <img
                  src={`http://localhost:5000/${lure.lureImagePath}`}
                  alt={lure.typeOfLure}
                  width="250"
                  height="175"
                  style={{ marginBottom: '10px' }}
                />
                <Button variant="contained" color="secondary" onClick={() => deleteLure(lure.id)}>
                  Delete
                </Button>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default LureList;