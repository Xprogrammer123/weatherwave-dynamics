import { WeatherData, WeatherCondition } from '../types/weather';

const API_KEY = '1c70bf7c4915ed5f700b8b90229eeabb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const getForecast = async (city: string, dt: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch forecast data');
    }

    const forecast = data.list[dt];
    return {
      city: data.city.name,
      country: data.city.country,
      temperature: Math.round(forecast.main.temp),
      condition: mapWeatherCondition(forecast.weather[0].main),
      humidity: forecast.main.humidity,
      windSpeed: Math.round(forecast.wind.speed * 3.6), // Convert m/s to km/h
      description: forecast.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

const mapWeatherCondition = (condition: string): WeatherCondition => {
  const conditionMap: { [key: string]: WeatherCondition } = {
    Clear: 'sunny',
    Rain: 'rainy',
    Clouds: 'cloudy',
    Snow: 'snowy',
    Thunderstorm: 'stormy',
    Drizzle: 'rainy',
    Mist: 'cloudy',
    Smoke: 'cloudy',
    Haze: 'cloudy',
    Dust: 'cloudy',
    Fog: 'cloudy',
    Sand: 'cloudy',
    Ash: 'cloudy',
    Squall: 'stormy',
    Tornado: 'stormy'
  };

  return conditionMap[condition] || 'cloudy';
};