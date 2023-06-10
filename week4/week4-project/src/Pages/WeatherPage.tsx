import { Outlet } from "react-router-dom";
import Header from "../components/atom/Header";
import SearchInput from "../components/atom/SearchInput";

const WeatherPage = () => {
  return (
    <div>
      <Header />
      <SearchInput />
      <Outlet />
    </div>
  );
};

export default WeatherPage;
