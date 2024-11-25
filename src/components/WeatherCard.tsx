import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-8 rounded-3xl backdrop-blur-lg bg-white/10 shadow-lg
        ${weather.condition === 'sunny' ? 'bg-sunny/10' :
          weather.condition === 'rainy' ? 'bg-rainy/10' :
          weather.condition === 'cloudy' ? 'bg-cloudy/10' :
          weather.condition === 'snowy' ? 'bg-snowy/10' :
          'bg-stormy/10'}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <WeatherIcon condition={weather.condition} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-2">
            {weather.temperature}°C
          </h2>
          <p className="text-xl mb-4 capitalize">
            {weather.description}
          </p>
          <p className="text-lg">
            {weather.city}, {weather.country}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-8 mt-6 text-sm"
        >
          <div>
            <p className="text-gray-500">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-500">Wind Speed</p>
            <p className="font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;