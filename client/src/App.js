import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Container, Paper, Box, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import LureForm from './LureForm';
import LureList from './LureList';


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
                Start by adding a lure
              </Typography>
            </Box>
          </Paper>
        </Container>

        <Container style={{ marginTop: '20px' }}>
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