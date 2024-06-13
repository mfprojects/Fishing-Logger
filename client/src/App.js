/*TODO: Data skal lagres mer separat i databasen -vær, lokasjon, fisk, fangst etc. Ved registrering av en fangst skal man få mulighet til å velge
fisk som er lagt inn fra før(slik som med lure). Det gir ikke mening å la brukeren legge til fisk, er jo begrenset hvor mange fuckings fiskearter en kan fange i Norge.
Dropper å implementere Trip. Kan heller kjøre spørringer som samler fangst fra samme dag, sted etc, så kan man bygge en Trip basert på dette.
*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Styling/theme'; // Custom Theme
import HomePage from './Components/HomePage';
import CatchPage from './Components/CatchPage';
import LurePage from './Components/LurePage';
import Footer from './Components/footer'; // Ensure correct casing

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
                  <MenuItem component={Link} to="/catch" onClick={handleMenuClose}>Catch</MenuItem>
                  <MenuItem component={Link} to="/lures" onClick={handleMenuClose}>Lures</MenuItem>
                </Menu>
                <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                  Fishing App
                </Typography>
                <Button color="primary" component={Link} to="/" sx={{ fontSize: '1rem', margin: '0 10px' }}>Home</Button>
                <Button color="primary" component={Link} to="/catch" sx={{ fontSize: '1rem', margin: '0 10px' }}>Catch</Button>
                <Button color="primary" component={Link} to="/lures" sx={{ fontSize: '1rem', margin: '0 10px' }}>Lures</Button>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catch" element={<CatchPage />} />
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
