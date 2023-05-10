import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WEATHER_TYPE } from "../../constants/weatherImg";
import { useGetDailyWeatherData } from "../../lib/hooks/useGetDailyWeatherData";
import Error404 from "../../Pages/Error404";
import { WeatherInfoToRender } from "../../types/weather";
import WeatherCard from "../atom/WeatherCard";
import WeatherCardSkeleton from "../skeleton/WeatherCardSkeleton";

const DailyWeather = () => {
  const { area } = useParams();
  const [detailWeatherInfo, setDetailWeatherInfo] =
    useState<WeatherInfoToRender>({
      name: "",
      main: { temp: 0, feels_like: 0, temp_min: 0, temp_max: 0 },
      clouds: { all: 100 },
      weatherImg: "",
    });

  const { isLoading, isError, getData } = useGetDailyWeatherData();

  const handleGetWeather = async (area: string) => {
    const {
      name,
      main: { temp, feels_like, temp_min, temp_max },
      clouds: { all },
      weather: [{ description }],
    } = await getData(area);

    const targetDesc = WEATHER_TYPE.find(
      (item) => item.description === description
    );

    setDetailWeatherInfo({
      name: name,
      weatherImg: targetDesc?.imgURL as string,
      main: {
        temp: temp,
        feels_like: feels_like,
        temp_min: temp_min,
        temp_max: temp_max,
      },
      clouds: { all: all },
    });
  };

  useEffect(() => {
    if (area) {
      handleGetWeather(area);
    }
  }, [area]);

  if (isLoading) return <WeatherCardSkeleton />;
  if (isError) return <Error404 />;

  return (
    <>
      <StWrapper>
        <WeatherCard
          isDaily={true}
          weatherCardInfo={detailWeatherInfo as WeatherInfoToRender}
        />
      </StWrapper>
    </>
  );
};

const StWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export default DailyWeather;
