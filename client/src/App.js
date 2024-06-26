import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Box, Grid } from '@mui/material';
import Logo from './logo.png';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Styling/theme'; // Custom Theme
import HomePage from './Pages/HomePage';
import CatchPage from './Pages/CatchPage';
import LurePage from './Pages/LurePage';
import DataPage from './Pages/DataPage'
import Footer from './Components/footer'; // Ensure correct casing

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <AppBar position="static" color="transparent" elevation={0} sx={{ width: '100%' }}>
            <Toolbar sx={{ width: '100%' }}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <IconButton component={Link} to="/" color="inherit" aria-label="menu">
                    <img src={Logo} alt="Logo" style={{ maxHeight: '100px', maxWidth: '100px', paddingRight: '10px' }} />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button color="primary" component={Link} to="/catch" sx={{ fontSize: '1rem' }}>Register Catch</Button>
                    <Button color="primary" component={Link} to="/lures" sx={{ fontSize: '1rem' }}>Register Lures</Button>
                    <Button color="primary" component={Link} to="/data" sx={{ fontSize: '1rem' }}>View Data</Button>
                  </Box>
                </Grid>
                <Grid item xs={4} />
              </Grid>
            </Toolbar>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, paddingTop: '0px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catch" element={<CatchPage />} />
              <Route path="/lures" element={<LurePage />} />
              <Route path="/data" element={<DataPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
