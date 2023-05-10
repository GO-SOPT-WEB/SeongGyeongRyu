import { BrowserRouter, Route, Routes } from "react-router-dom";
import DailyWeather from "./components/organism/DailyWeather";
import WeeklyWeather from "./components/organism/WeeklyWeather";
import Error404 from "./Pages/Error404";
import WeatherPage from "./Pages/WeatherPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherPage />}>
            <Route path="/day/:area" element={<DailyWeather />} />
            <Route path="/week/:area" element={<WeeklyWeather />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
