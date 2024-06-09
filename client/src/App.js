import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Container, Paper, Box, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import LureForm from './Components/LureForm';
import LureList from './Components/LureList';
import FishForm from './Components/FishForm';
import FishList from './Components/FishList';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  //Refresher når ny Lure legges til for å vise i listen.
  const [refresh, setRefresh] = useState(false);
  const handleLureAdded = () => {
    setRefresh((prev) => !prev);
  };

    //Refresher når ny Fish legges til for å vise i listen.
    const [refreshFish, setRefreshFish] = useState(false);
    const handleFishAdded = () => {
      setRefreshFish((prev) => !prev);
    };
  
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Fishing App
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                Welcome to FishApp
              </Typography>
              <Typography variant="body1" paragraph>
                Start by adding a fish
              </Typography>
            </Box>
          </Paper>
        </Container>

        <Container style={{ paddingTop: '0px' }}>
          <Paper elevation={3}>
          <Box>
          <FishForm onFishAdded={handleFishAdded} />
          <FishList refreshFish={refreshFish} />
          </Box>
          </Paper>
        </Container>

        <Container style={{ paddingTop: '0px' }}>
          <Paper elevation={3}>
          <Box>
          <LureForm onLureAdded={handleLureAdded} />
          <LureList refresh={refresh} />
          </Box>
          </Paper>
        </Container>

      </div>
    </ThemeProvider>
  );
}

export default App;