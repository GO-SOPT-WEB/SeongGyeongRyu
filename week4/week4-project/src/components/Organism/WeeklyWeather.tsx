import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { WEATHER_TYPE } from "../../constants/weatherImg";
import { useGetWeeklyWeatherData } from "../../lib/hooks/useGetWeeklyWeatherData";
import Error404 from "../../Pages/Error404";
import { WeatherInfo, WeatherInfoToRender } from "../../types/weather";
import WeatherCard from "../atom/WeatherCard";
import WeatherCardSkeleton from "../skeleton/WeatherCardSkeleton";

const WeeklyWeather = () => {
  const { area } = useParams();
  const [weeklyWeatherDataList, setWeeklyWeatherDataList] =
    useState<WeatherInfoToRender[]>();

  const { isLoading, isError, getData } = useGetWeeklyWeatherData();

  const handleGetWeather = async (area: string) => {
    const { list } = await getData(area);
    const weatherDataList = list.slice(0, 5);
    const dataList: WeatherInfoToRender[] = [];
    weatherDataList.forEach(
      ({
        main: { temp, feels_like, temp_min, temp_max },
        clouds: { all },
        weather: [{ description }],
        dt_txt,
      }: WeatherInfo) => {
        const targetDesc = WEATHER_TYPE.find(
          (item) => item.description === description
        );
        dataList.push({
          main: {
            temp: temp,
            feels_like: feels_like,
            temp_min: temp_min,
            temp_max: temp_max,
          },
          clouds: { all: all },
          weatherImg: targetDesc?.imgURL as string,
          dt_txt: dt_txt,
        });
      }
    );

    setWeeklyWeatherDataList(dataList);
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
        {weeklyWeatherDataList?.map((info) => {
          return <WeatherCard isDaily={false} weatherCardInfo={info} />;
        })}
      </StWrapper>
    </>
  );
};

const StWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export default WeeklyWeather;
