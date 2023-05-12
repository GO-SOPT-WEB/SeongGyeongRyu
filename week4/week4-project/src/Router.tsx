import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherSection from "./components/organism/WeatherSection";
import Error404 from "./Pages/Error404";
import WeatherPage from "./Pages/WeatherPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherPage />}>
            <Route path="/:type/:area" element={<WeatherSection />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
