import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#F0F0F0",
    },
    primary: {
      main: "#1E88E5", // A professional dark blue
      contrastText: "#ffffff", // White text on primary buttons
    },
    secondary: {
      main: "#D32F2F", // A stronger red for delete buttons
      contrastText: "#ffffff", // White text on secondary buttons
    },
    text: {
      primary: "#333333", // Dark grey for primary text
      secondary: "#555555", // Medium grey for secondary text
    },
    error: {
      main: "#e57373", // A standard red for errors
    },
    warning: {
      main: "#ffb74d", // A standard orange for warnings
    },
    info: {
      main: "#64b5f6", // A standard blue for info
    },
    success: {
      main: "#81c784", // A standard green for success
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: "#D32F2F",
          '&:hover': {
            backgroundColor: "#B71C1C",
          },
        },
      },
    },
  },
});

export default theme;
