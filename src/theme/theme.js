import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#008000' },
    secondary: { main: '#dc004e' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
          '& .MuiInputBase-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
