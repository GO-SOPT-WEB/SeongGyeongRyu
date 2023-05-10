import React from "react";
import styled from "styled-components";
import { WEATHER_TYPE } from "../constants/weatherImg";

const WeatherCard = () => {
  const detailWeatherInfoList = [];
  const tempImg = WEATHER_TYPE[0].imgURL;
  return (
    <>
      <StCardrapper>
        <time>날짜</time>
        <img src={tempImg} />

        <StWeatherInfoWrapper>
          <li>
            <p>체감 온도</p>
            <h2>19.65</h2>
          </li>
          <li>
            <h2>체감 온도</h2>
            <p>19.21</p>
          </li>
          <li>
            <h2>최저 / 최고</h2>
            <p>19.65</p>
          </li>
          <li>
            <h2>구름</h2>
            <p>100%</p>
          </li>
        </StWeatherInfoWrapper>
      </StCardrapper>
    </>
  );
};

const StCardrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  gap: 1.3rem;

  width: 20%;

  background-color: ${({ theme }) => theme.colors.Weather_Card_Blue};
  border-radius: 4rem;

  > time {
    font-size: 2.5rem;
  }

  > img {
    width: 95%;
    height: 17rem;
  }
`;

const StWeatherInfoWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  width: 95%;

  > li {
    display: flex;
    justify-content: space-between;

    width: 100%;

    > p,
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export default WeatherCard;
