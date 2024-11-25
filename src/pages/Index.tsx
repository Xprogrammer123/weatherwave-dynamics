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

  const handleSearch = (city: string) => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getBackgroundImage = (condition?: WeatherCondition) => {
    switch (condition) {
      case "sunny":
        return "https://images.unsplash.com/photo-1518495973542-4542c06a5843";
      case "rainy":
        return "https://images.unsplash.com/photo-1433086966358-54859d0ed716";
      case "cloudy":
        return "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb";
      case "snowy":
        return "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
      case "stormy":
        return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21";
      default:
        return "https://beach-weather.com/static/images/beach/small/paraiso_beach_cayo_largo_cuba.jpg";
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${getBackgroundImage(weather?.condition)})`,
        }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6"
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
    </div>
  );
};

export default Index;
