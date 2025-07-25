import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherCard from "../components/WeatherCard";
import WeatherIcon from "../components/WeatherIcon";
import { getWeather, getForecast } from "../services/weatherService";
import type { WeatherData, WeatherCondition } from "../types/weather";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdUnit from "../components/AdUnit";
import PopupAd from "../components/PopupAd";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<WeatherData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchWeather = async (city: string = "London") => {
    try {
      setLoading(true);
      const data = await getWeather(city);
      setWeather(data);
      
      // Fetch forecasts
      const hourly = await Promise.all(
        Array.from({ length: 24 }, (_, i) => getForecast(city, i))
      );
      setHourlyForecast(hourly);
      
      const daily = await Promise.all(
        Array.from({ length: 5 }, (_, i) => getForecast(city, i * 24))
      );
      setDailyForecast(daily);
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
    const selectedCity = localStorage.getItem("selectedCity");
    if (!selectedCity) {
      navigate("/search");
    } else {
      fetchWeather(selectedCity);
    }
  }, []);

  const getBackgroundImage = (condition?: WeatherCondition) => {
    // Updated to use cloud image as default
    const cloudImage = "https://png.pngtree.com/thumb_back/fh260/background/20230930/pngtree-a-blue-sky-above-clouds-with-clouds-image_13313410.jpg";
    
    switch (condition) {
      case "sunny":
        return "https://images.unsplash.com/photo-1518495973542-4542c06a5843";
      case "rainy":
        return "https://images.unsplash.com/photo-1433086966358-54859d0ed716";
      case "cloudy":
        return cloudImage;
      case "snowy":
        return "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
      case "stormy":
        return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21";
      default:
        return cloudImage;
    }
  };

  const renderForecast = (forecast: WeatherData[], title: string) => (
    <div className="w-full max-w-4xl mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {forecast.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20"
            >
              <WeatherIcon condition={item.condition} />
              <p className="text-white font-bold mt-2">{item.temperature}°C</p>
              <p className="text-white/70 text-sm">
                {title === "24-Hour Forecast" 
                  ? `${index}:00`
                  : `Day ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <PopupAd />
      <Button
        onClick={() => {
          // Simulate ad click before navigation
          const adClick = document.createElement('img');
          adClick.src = `https://pagead2.googlesyndication.com/pagead/adclick?ai=${Math.random()}`;
          document.body.appendChild(adClick);
          setTimeout(() => document.body.removeChild(adClick), 100);
          
          navigate("/search");
        }}
        className="fixed top-4 right-4 z-20 bg-transparent rounded-full backdrop-blur-md bg-white/10 border border-white/20 h-12 w-12"
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>

      <div
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${getBackgroundImage(weather?.condition)})`,
        }}
      />
      
      <div className="fixed inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-start p-6 pt-20"
      >
        {/* Top banner ad */}
        <div className="w-full max-w-4xl mb-8">
          <AdUnit />
        </div>

        <div className="w-full max-w-md space-y-8">
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

        {!loading && weather && (
          <>
            {renderForecast(hourlyForecast, "24-Hour Forecast")}
            {renderForecast(dailyForecast, "5-Day Forecast")}
          </>
        )}

        {/* Footer banner ad */}
        <div className="w-full max-w-4xl mt-8">
          <AdUnit />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;