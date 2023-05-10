import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WeeklyWeather = () => {
  const [isDailyInfo, setIsDailyInfo] = useState(true);
  return (
    <>
      <StWeatherSectionWrapper></StWeatherSectionWrapper>
    </>
  );
};

const StWeatherSectionWrapper = styled.main`
  margin: 2rem;
`;

export default WeeklyWeather;
