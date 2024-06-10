import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Styling/theme'; // Custom Theme
import HomePage from './Components/HomePage';
import FishPage from './Components/FishPage';
import LurePage from './Components/LurePage';
import Footer from './Components/Footer'; // Ensure correct casing

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <AppBar position="static" color="transparent" elevation={0}>
            <Container sx={{ maxWidth: '100%', padding: 0 }}>
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                  <MenuItem component={Link} to="/fish" onClick={handleMenuClose}>Fish</MenuItem>
                  <MenuItem component={Link} to="/lures" onClick={handleMenuClose}>Lures</MenuItem>
                </Menu>
                <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                  Fishing App
                </Typography>
                <Button color="primary" component={Link} to="/" sx={{ fontSize: '1rem', margin: '0 10px' }}>Home</Button>
                <Button color="primary" component={Link} to="/fish" sx={{ fontSize: '1rem', margin: '0 10px' }}>Fish</Button>
                <Button color="primary" component={Link} to="/lures" sx={{ fontSize: '1rem', margin: '0 10px' }}>Lures</Button>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fish" element={<FishPage />} />
              <Route path="/lures" element={<LurePage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
