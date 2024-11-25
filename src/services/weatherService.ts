import axios from 'axios';
import { WeatherData, WeatherCondition } from '../types/weather';

const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const mapCondition = (code: number): WeatherCondition => {
  if (code >= 200 && code < 300) return 'stormy';
  if (code >= 300 && code < 600) return 'rainy';
  if (code >= 600 && code < 700) return 'snowy';
  if (code >= 700 && code < 800) return 'cloudy';
  if (code === 800) return 'sunny';
  return 'cloudy';
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    return {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      condition: mapCondition(response.data.weather[0].id),
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed),
      description: response.data.weather[0].description
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getForecast = async (city: string, dt: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    const forecast = response.data.list.find((item: any) => 
      Math.abs(item.dt - dt) < 10800
    );
    
    if (!forecast) throw new Error('No forecast found for specified time');
    
    return {
      city: response.data.city.name,
      country: response.data.city.country,
      temperature: Math.round(forecast.main.temp),
      condition: mapCondition(forecast.weather[0].id),
      humidity: forecast.main.humidity,
      windSpeed: Math.round(forecast.wind.speed),
      description: forecast.weather[0].description
    };
  } catch (error) {
    throw new Error('Failed to fetch forecast data');
  }
};