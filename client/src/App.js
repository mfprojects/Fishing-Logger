import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Paper, Box, IconButton, Button, Menu, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Styling/theme'; // Custom Theme
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './Components/HomePage';
import FishPage from './Components/FishPage';
import LurePage from './Components/LurePage';

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
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem component={Link} to="/fish" onClick={handleMenuClose}>Fish</MenuItem>
                <MenuItem component={Link} to="/lures" onClick={handleMenuClose}>Lures</MenuItem>
              </Menu>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Fishing App
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/fish">Fish</Button>
              <Button color="inherit" component={Link} to="/lures">Lures</Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fish" element={<FishPage />} />
            <Route path="/lures" element={<LurePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
