import { client } from "../axios";
import { useState } from "react";

export const useGetWeatherData = (checkNum: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  //getData는 비동기 함수를 "실행하는 함수"이다.
  //따라서 내부 실행은 비동기적으로 되겠지만 만약 여기서 받아온 값을 변수에 넣어줘야한다면 getData 앞에도 await를 붙여야한다.
  //붙이지 않으면 비동기함수가 실행되고 있는 와중에 다른 코드를 실행해버리기 때문에 제대로 get 함수가 리턴하는 값을 받아올 수 없다.
  const getData = async (area: string) => {
    setIsLoading(true);
    try {
      let apiAddress = ``;
      if (checkNum) {
        apiAddress = `/forecast?q=${area}&appid=${
          import.meta.env.VITE_APP_WEATHER
        }&units=metric`;
      } else {
        apiAddress = `/weather?q=${area}&appid=${
          import.meta.env.VITE_APP_WEATHER
        }&units=metric`;
      }
      const res = await client.get(apiAddress);

      return res.data;
    } catch (error) {
      setIsError(true);
    }
  };

  return { isLoading, isError, getData };
};
