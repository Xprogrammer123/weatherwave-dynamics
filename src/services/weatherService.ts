import { WeatherData, WeatherCondition } from '../types/weather';

const mockWeatherData: WeatherData = {
  city: "London",
  country: "GB",
  temperature: 18,
  condition: "cloudy",
  humidity: 75,
  windSpeed: 12,
  description: "scattered clouds"
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...mockWeatherData,
    city: city || mockWeatherData.city
  };
};

export const getForecast = async (city: string, dt: number): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...mockWeatherData,
    city: city || mockWeatherData.city
  };
};