export interface CommonWeatherInfo {
  name?: string; // 지역이름
  main: {
    temp: number; // 현재 온도
    feels_like: number; // 체감기온
    temp_min: number; // 최저
    temp_max: number; // 최고
  };
  clouds: {
    all: number; // 구름 %
  };
  dt_txt?: string; // 날짜
}

export interface WeatherInfo extends CommonWeatherInfo {
  weather: [
    {
      description: string; // 날씨 설명
    }
  ];
}

export interface WeatherInfoToRender extends CommonWeatherInfo {
  weatherImg: string;
}

export interface GetFiveDayWeatherInfo {
  list: WeatherInfo[];
}
