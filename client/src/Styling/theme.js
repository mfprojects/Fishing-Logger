import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  "colorSchemes": {
    "light": {
      "palette": {}
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#e3f2fd",
          "100": "#bbdefb",
          "200": "#90caf9",
          "300": "#64b5f6",
          "400": "#42a5f5",
          "500": "#2196f3",
          "600": "#1e88e5",
          "700": "#1976d2",
          "800": "#1565c0",
          "900": "#0d47a1"
        },
        "neutral": {
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#e2e8f0",
          "300": "#cbd5e1",
          "400": "#94a3b8",
          "500": "#64748b",
          "600": "#475569",
          "700": "#334155",
          "800": "#1e293b",
          "900": "#0f172a"
        }
      }
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;