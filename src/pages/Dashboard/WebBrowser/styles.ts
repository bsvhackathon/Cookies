import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Purple color like Brave Browser
    },
    secondary: {
      main: '#03dac6', // Teal accent color
    },
    background: {
      default: '#f5f5f5', // Light grey for the app background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none', // No uppercase buttons
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Ensures the app takes up the full height of the window
        html: {
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden', // Prevent scrolling
        },
        '#root': {
          height: '100%', // Ensures your root container is full-height
        },
      },
    },
  },
});

export default theme;

