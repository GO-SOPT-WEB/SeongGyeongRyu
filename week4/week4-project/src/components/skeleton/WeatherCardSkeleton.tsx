import React from "react";
import styled from "styled-components";
import { loading } from "./animation";

const WeatherCardSkeleton = () => {
  return (
    <>
      <StCardWrapper>
        <div></div>
        <img />
        <StWeatherInfo />
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

  border-radius: 4rem;
  animation: ${loading} 2s infinite linear;

  > div {
    width: 95%;
    height: 5rem;
    animation: ${loading} 2s infinite linear;
  }

  > img {
    width: 95%;
    height: 17rem;
    animation: ${loading} 2s infinite linear;
  }
`;

const StWeatherInfo = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  width: 95%;
  height: 17rem;
  animation: ${loading} 2s infinite linear;
`;

export default WeatherCardSkeleton;
