import styled from "styled-components";
import { DailyWeatherInfo } from "../../types/weather";

export interface WeatherCardProps {
  weatherCardInfo: DailyWeatherInfo;
}

const WeatherCard = (props: WeatherCardProps) => {
  const {
    weatherCardInfo: {
      name,
      main: { temp, feels_like, temp_min, temp_max },
      clouds: { all },
      weatherImg,
    },
  } = props;
  console.log(name);

  return (
    <>
      <StCardWrapper>
        <time>{name}</time>
        <img src={weatherImg} />

        <StWeatherInfoWrapper>
          <li>
            <p>체감 온도</p>
            <h2>{temp}</h2>
          </li>
          <li>
            <h2>체감 온도</h2>
            <p>{feels_like}</p>
          </li>
          <li>
            <h2>최저 / 최고</h2>
            <p>
              {temp_min}/{temp_max}
            </p>
          </li>
          <li>
            <h2>구름</h2>
            <p>{all}%</p>
          </li>
        </StWeatherInfoWrapper>
      </StCardWrapper>
    </>
  );
};

const StCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  gap: 1.3rem;

  width: 25rem;

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