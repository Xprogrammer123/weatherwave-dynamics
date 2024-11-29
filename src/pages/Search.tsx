import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import AdUnit from "../components/AdUnit";
import PopupAd from "../components/PopupAd";

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAd, setShowAd] = useState(false);

  const handleSearch = (city: string) => {
    if (!showAd) {
      setShowAd(true);
    } else {
      if (city.trim()) {
        localStorage.setItem("selectedCity", city);
        navigate("/");
        toast({
          title: "City Selected",
          description: `Weather information for ${city} will be displayed`,
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <PopupAd open={showAd} onOpenChange={setShowAd} onAdClick={() => {
        const city = localStorage.getItem("selectedCity") || "London";
        localStorage.setItem("selectedCity", city);
        navigate("/");
      }} />
      
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Top banner ad */}
        <div className="w-full max-w-4xl mb-8">
          <AdUnit />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">WeatherWave</h1>
            <p className="text-white/80">Search for your city to get started</p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Footer banner ad */}
        <div className="w-full max-w-4xl mt-8 sticky bottom-0">
          <AdUnit slot="3494358496" />
        </div>
      </div>
    </div>
  );
};

export default Search;