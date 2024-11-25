import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { WeatherCondition } from "../types/weather";

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

const WeatherIcon = ({ condition, className = "" }: WeatherIconProps) => {
  const iconMap = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
    snowy: CloudSnow,
    stormy: CloudLightning,
  };

  const Icon = iconMap[condition];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Icon className="w-24 h-24" />
    </motion.div>
  );
};

export default WeatherIcon;