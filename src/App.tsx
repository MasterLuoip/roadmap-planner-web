import { createTheme, ThemeProvider } from '@material-ui/core';
import { RoadmapView } from './components/roadmapPage/RoadmapView';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#795548',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#ff8a65',
      // dark: will be calculated from palette.secondary.main,
      contrastText: 'black',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});
function App() {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <RoadmapView />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
