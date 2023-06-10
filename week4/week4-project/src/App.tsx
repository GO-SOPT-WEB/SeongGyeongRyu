import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { useGetWeatherData } from "./lib/api/useGetWeatherData";
import WeatherPage from "./Pages/WeatherPage";
import Router from "./Router";
import GlobalStyle from "./style/globalStyle";
import theme from "./style/theme";

function App() {
  const [count, setCount] = useState(0);
  // const { weatherInfo } = useGetWeatherData("Seoul");
  // console.log(weatherInfo);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
