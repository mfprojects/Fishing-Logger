import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#F0F0F0",
    },
    primary: {
      //main: "#1E88E5",
      main: '#1976d2',
      contrastText: "#ffffff",
    },
    secondary: {
      //main: "#D32F2F",
      main: '#dc004e',
      contrastText: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
    error: {
      main: "#e57373",
    },
    warning: {
      main: "#ffb74d",
    },
    info: {
      main: "#64b5f6",
    },
    success: {
      main: "#81c784",
    },
  },
  
  //Må utarbeide en mer gjennomført fonthåndtering senere
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '10px 20px',
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 3px 15px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        },
      },
    },
  },
});

export default theme;
