import { ThemeProvider } from 'styled-components';
import { RoadmapView } from './components/roadmapPage/RoadmapView';

const theme = {
  primary: 'red',
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RoadmapView />
    </ThemeProvider>
  );
}

export default App;
