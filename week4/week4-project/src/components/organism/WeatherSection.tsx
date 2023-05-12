import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WEATHER_TYPE } from "../../constants/weatherImg";
import { useGetWeatherData } from "../../lib/hooks/useGetWeatherData";

import Error404 from "../../Pages/Error404";
import { WeatherInfo, WeatherInfoToRender } from "../../types/weather";
import WeatherCard from "../atom/WeatherCard";
import LoadingSection from "../skeleton/LoadingSection";
import WeatherCardSkeleton from "../skeleton/WeatherCardSkeleton";

const WeatherSection = () => {
  const { type, area } = useParams();
  const [detailWeatherInfo, setDetailWeatherInfo] = useState<
    WeatherInfoToRender | WeatherInfoToRender[]
  >();

  const { dailyInfo, weeklyInfo, isLoading, isError } = useGetWeatherData(
    type as string,
    area as string
  );

  const handleGetWeather = async () => {
    setDetailWeatherInfo(undefined);
    if (dailyInfo) {
      const {
        name,
        main: { temp, feels_like, temp_min, temp_max },
        clouds: { all },
        weather: [{ description }],
      } = dailyInfo;
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
    }

    if (weeklyInfo) {
      const { list } = weeklyInfo;
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
      setDetailWeatherInfo(dataList);
    }
  };

  useEffect(() => {
    if (area) {
      handleGetWeather();
    }
  }, [area, type, dailyInfo, weeklyInfo]);

  if (isLoading)
    return <LoadingSection isDaily={type === "day" ? true : false} />;
  if (isError) return <Error404 />;

  if (dailyInfo && detailWeatherInfo) {
    return (
      <StWrapper>
        <WeatherCard
          isDaily={true}
          weatherCardInfo={detailWeatherInfo as WeatherInfoToRender}
        />
      </StWrapper>
    );
  } else if (weeklyInfo && Array.isArray(detailWeatherInfo)) {
    console.log(typeof detailWeatherInfo, detailWeatherInfo);
    return (
      <StWrapper>
        {detailWeatherInfo?.map((info, idx) => (
          <WeatherCard key={idx} isDaily={false} weatherCardInfo={info} />
        ))}
      </StWrapper>
    );
  } else {
    console.log(detailWeatherInfo);

    return <Error404 />;
  }
};

const StWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
export default WeatherSection;
