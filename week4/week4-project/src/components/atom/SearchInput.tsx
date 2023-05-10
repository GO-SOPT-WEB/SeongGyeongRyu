import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchInput = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDailyInfo, setIsDailyInfo] = useState<boolean>();

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "daily") setIsDailyInfo(true);
    else setIsDailyInfo(false);
  };

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const area = inputRef.current?.value;
    if (isDailyInfo) navigate(`/day/${area}`);
    else navigate(`/week/${area}`);
  };

  return (
    <>
      <StSearchForm onSubmit={(e) => handleNavigate(e)}>
        <StPeriodOption onChange={(e) => handleOptionChange(e)}>
          <option value="daily">오늘</option>
          <option value="weekly">주간</option>
        </StPeriodOption>

        <input placeholder="영어로 도시명 ex) seoul " ref={inputRef} />
        <button type="submit">날씨 검색</button>
      </StSearchForm>
    </>
  );
};

const StSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
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

export default SearchInput;
