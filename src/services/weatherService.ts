import axios from 'axios';
import { WeatherData, WeatherCondition } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
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
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.data) {
      throw new Error('No data received from weather API');
    }

    return {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      condition: mapCondition(response.data.weather[0].id),
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed),
      description: response.data.weather[0].description
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
    }
    throw new Error('Failed to fetch weather data: ' + (error.message || 'Unknown error'));
  }
};

export const getForecast = async (city: string, dt: number): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.data) {
      throw new Error('No data received from forecast API');
    }

    const forecast = response.data.list.find((item: any) => 
      Math.abs(item.dt - dt) < 10800
    );
    
    if (!forecast) {
      throw new Error('No forecast found for specified time');
    }
    
    return {
      city: response.data.city.name,
      country: response.data.city.country,
      temperature: Math.round(forecast.main.temp),
      condition: mapCondition(forecast.weather[0].id),
      humidity: forecast.main.humidity,
      windSpeed: Math.round(forecast.wind.speed),
      description: forecast.weather[0].description
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
    }
    throw new Error('Failed to fetch forecast data: ' + (error.message || 'Unknown error'));
  }
};