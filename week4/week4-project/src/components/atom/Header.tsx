import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <StHeader>
        <h1>☀️ 승경씨의 날씨 예보 ☀️</h1>
      </StHeader>
    </>
  );
};

const StHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;

  width: 100%;
  height: 8rem;

  background-color: ${({ theme }) => theme.colors.Weather_Header_Blue};

  > h1 {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.colors.Weather_Text_White};
  }
`;

export default Header;
