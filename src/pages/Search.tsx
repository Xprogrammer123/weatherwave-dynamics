import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (city: string) => {
    if (city.trim()) {
      localStorage.setItem("selectedCity", city);
      navigate("/");
      toast({
        title: "City Selected",
        description: `Weather information for ${city} will be displayed`,
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
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
      </div>
    </div>
  );
};

export default Search;