import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './i18n';
import Section from './components/Section';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Section/>
  </ThemeProvider>
);

export default App;
