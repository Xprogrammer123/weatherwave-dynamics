import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";
import { getWeather } from "../services/weatherService";
import type { WeatherData, WeatherCondition } from "../types/weather";
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWeather = async (city: string = "London") => {
    try {
      setLoading(true);
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (query: string) => {
    if (query.length >= 3) {
      fetchWeather(query);
    }
  };

  const getBackgroundColor = (condition?: WeatherCondition) => {
    switch (condition) {
      case "sunny":
        return "bg-gradient-to-br from-sunny/30 to-sunny";
      case "rainy":
        return "bg-gradient-to-br from-rainy/30 to-rainy";
      case "cloudy":
        return "bg-gradient-to-br from-cloudy/30 to-cloudy";
      case "snowy":
        return "bg-gradient-to-br from-snowy/30 to-snowy";
      case "stormy":
        return "bg-gradient-to-br from-stormy/30 to-stormy";
      default:
        return "bg-gradient-to-br from-gray-200 to-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500
        ${getBackgroundColor(weather?.condition)}`}
    >
      <div className="w-full max-w-md space-y-8">
        <SearchBar onSearch={handleSearch} />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </motion.div>
          ) : weather ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WeatherCard weather={weather} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Index;