import React, { useState } from "react";
import styled from "styled-components";
import WeatherCard from "../Atom/WeatherCard";

const WeatherSection = () => {
  const [isDailyInfo, setIsDailyInfo] = useState(true);
  return (
    <>
      <StWeatherSectionWrapper>
        <StSearchForm>
          <StPeriodOption>
            <option>오늘</option>
            <option>주간</option>
          </StPeriodOption>

          <input placeholder="영어로 도시명 ex) seoul " />
          <button type="submit">날씨 검색</button>
        </StSearchForm>
        <WeatherCard />
      </StWeatherSectionWrapper>
    </>
  );
};

const StWeatherSectionWrapper = styled.main`
  margin: 2rem;
`;

const StSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  width: 100%;

  > input {
    width: 30rem;
    height: 6rem;
    padding: 2rem;

    border-radius: 2rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.Weather_Header_Blue};

    font-size: 2.3rem;
  }

  > button {
    width: 10rem;
    height: 6rem;

    background-color: ${({ theme }) => theme.colors.Weather_Btn_Blue};
    border: none;
    border-radius: 1.5rem;

    font-size: 2rem;
    color: ${({ theme }) => theme.colors.Weather_Text_White};
  }
`;

const StPeriodOption = styled.select`
  width: 8rem;
  height: 3rem;

  border-radius: 3rem;
  border: 0.2rem solid gray;
`;

const StWeatherInfoWrapper = styled.main`
  width: 100%;
`;

export default WeatherSection;
