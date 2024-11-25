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
      className={`rounded-3xl backdrop-blur-xl bg-white/5 shadow-lg border border-white/20
        ${weather.condition === 'sunny' ? 'bg-sunny/5' :
          weather.condition === 'rainy' ? 'bg-rainy/5' :
          weather.condition === 'cloudy' ? 'bg-cloudy/5' :
          weather.condition === 'snowy' ? 'bg-snowy/5' :
          'bg-stormy/5'}`}
    >
      <div className="p-8">
        <div className="flex flex-col items-center space-y-4">
          <WeatherIcon condition={weather.condition} />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white"
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
            className="grid grid-cols-2 gap-8 mt-6 text-sm text-white"
          >
            <div>
              <p className="text-white/70">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-white/70">Wind Speed</p>
              <p className="font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
