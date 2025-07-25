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
      className={`flex justify-center items-center rounded-3xl backdrop-blur-md bg-white/10 shadow-lg border border-white/20 
  w-full max-w-[90vw] md:max-w-[70vw] lg:w-[100vh] h-[50vh] -ml-0 md:-ml-30 lg:-ml-60

        ${weather.condition === 'sunny' ? 'bg-sunny/10' :
          weather.condition === 'rainy' ? 'bg-rainy/10' :
          weather.condition === 'cloudy' ? 'bg-cloudy/10' :
          weather.condition === 'snowy' ? 'bg-snowy/10' :
          'bg-stormy/10'}`}
    >
      <div className="px-5 py-8 w-full h-full flex flex-col justify-center items-center">
        <WeatherIcon condition={weather.condition} />
        
       <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="text-center text-white"
>
  <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-bold mb-2">
    {weather.temperature}°C
  </h2>
  <p className="text-xl md:text-2xl lg:text-3xl mb-4 capitalize">
    {weather.description}
  </p>
  <p className="text-sm md:text-base lg:text-lg">
    {weather.city}, {weather.country}
  </p>
</motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-8 mt-6 text-sm text-white"
        >
          <div>
            <p className="text-white/70 text-xl">Humidity</p>
            <p className="font-semibold text-xl">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-white/70 text-xl">Wind Speed</p>
            <p className="font-semibold text-xl">{weather.windSpeed} km/h</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
