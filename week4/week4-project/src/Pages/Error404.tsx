import React from "react";
import styled from "styled-components";

const Error404 = () => {
  return <StErrorMsg>페이지가 존재하지 않습니다!</StErrorMsg>;
};

const StErrorMsg = styled.h2`
  margin-left: 3rem;
  font-size: 3rem;
`;

export default Error404;
