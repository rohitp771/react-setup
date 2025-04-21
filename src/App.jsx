import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './i18n';
import AboutYourself from './pages/Aboutyourself';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AboutYourself />
  </ThemeProvider>
);

export default App;
