import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getBackgroundImage = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'https://images.unsplash.com/photo-1518495973542-4542c06a5843';
      case 'rainy':
        return 'https://images.unsplash.com/photo-1433086966358-54859d0ed716';
      case 'cloudy':
        return 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb';
      case 'snowy':
        return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';
      case 'stormy':
        return 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21';
      default:
        return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb';
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${getBackgroundImage(weather.condition)})`,
          opacity: 0.15
        }}
      />

      {/* Content */}
      <div className={`relative z-10 p-8 backdrop-blur-lg
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
      </div>
    </motion.div>
  );
};

export default WeatherCard;