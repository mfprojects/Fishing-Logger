/*TODO: Data skal lagres mer separat i databasen -vær, lokasjon, fisk, fangst etc. Ved registrering av en fangst skal man få mulighet til å velge
fisk som er lagt inn fra før(slik som med lure). Det gir ikke mening å la brukeren legge til fisk, er jo begrenset hvor mange fuckings fiskearter en kan fange i Norge.
Dropper å implementere Trip. Kan heller kjøre spørringer som samler fangst fra samme dag, sted etc, så kan man bygge en Trip basert på dette.
*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Container, Box } from '@mui/material';
import Logo from './logo.png'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Styling/theme'; // Custom Theme
import HomePage from './Components/HomePage';
import CatchPage from './Components/CatchPage';
import LurePage from './Components/LurePage';
import Footer from './Components/footer'; // Ensure correct casing

function App() {


  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };
//Endret max width i container 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <AppBar position="static" color="transparent" elevation={0}>
            <Container sx={{ maxWidth: 'xl', padding: 0 }}> 
              <Toolbar>
                <IconButton component={Link} to="/" color="inherit" aria-label="menu">
                <img src={Logo} alt="Logo" style={{ maxHeight: '100px', maxWidth: '100px', mr: '10px', flexGrow: 1 }} />
                </IconButton>            
                <Menu anchorElNav={anchorElNav} open={Boolean(anchorElNav)} onClose={handleMenuClose}>
                  <MenuItem component={Link} to="/fish" onClick={handleMenuClose}>Fish</MenuItem>
                  <MenuItem component={Link} to="/lures" onClick={handleMenuClose}>Lures</MenuItem>
                </Menu>
                <Button color="primary" component={Link} to="/catch" sx={{ fontSize: '1rem', margin: '0 10px' }}>Catch</Button>
                <Button color="primary" component={Link} to="/lures" sx={{ fontSize: '1rem', margin: '0 10px' }}>Lures</Button>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, paddingTop: '0px' }}>
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
