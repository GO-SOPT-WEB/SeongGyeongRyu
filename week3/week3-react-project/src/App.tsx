import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyle";
import Quiz from "./pages/Quiz";

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Quiz />
    </ThemeProvider>
  </>
);

export default App;
