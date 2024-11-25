export type WeatherCondition = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'stormy';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface Country {
  name: string;
  code: string;
  capital: string;
}