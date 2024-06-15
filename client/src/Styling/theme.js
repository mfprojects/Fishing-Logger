import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffefca',
    },
    primary: {
      main: '#007665',
      contrastText: "#c5cfae",
    },
    secondary: {
      main: '#e57373',
      contrastText: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
    delete: {
      main: "#FF4C4C",
    },
    error: {
      main: "#e57373",
    },
    warning: {
      main: "#ffb74d",
    },
    info: {
      main: "#00bed8",
    },
    success: {
      main: "#81c784",
    },
  },
  
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h3: {
      color: '#007665'
    },
    h4: {
      color: '#007665'
    },
    h6: {
      color: '#ff8c5a'
    }
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
          '&:hover': {
            backgroundColor: 'rgba(0, 118, 101, 0.1)', // Example hover effect
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '10px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'inherit', // No hover effect
            boxShadow: 'none', // No shadow on hover
          },
          '&:active': {
            backgroundColor: 'inherit', // No click effect
            boxShadow: 'none', // No shadow on click
          },
          '&:focus': {
            backgroundColor: 'inherit', // No focus effect
            boxShadow: 'none', // No shadow on focus
          }
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
          borderBottom: 'none', // Remove border-bottom
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5FFFA',
        },
      },
    },
  },
  gradients: {
    frontPage: 'linear-gradient(0deg, rgba(119,227,239,1) 0%, rgba(255,238,203,1) 100%)',
  },
});

export default theme;
