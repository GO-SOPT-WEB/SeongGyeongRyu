import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherCard from "./components/Atom/WeatherCard";
import WeatherSection from "./components/Organism/WeatherSection";
import Error404 from "./Pages/Error404";
import WeatherPage from "./Pages/WeatherPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherPage />}>
            <Route path="/day/:area" element={<WeatherCard />} />
            <Route path="/week/:area" element={<WeatherSection />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
