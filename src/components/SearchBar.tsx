import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-md"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search city..."
          className="w-full px-4 py-2 pl-10 pr-20 rounded-lg bg-white/20 backdrop-blur-lg
                     border border-white/10 focus:outline-none focus:ring-2 
                     focus:ring-white/20 transition-all text-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        <Button
          onClick={handleSearch}
          className="absolute right-2 top-1 px-4 py-1 bg-white/20 hover:bg-white/30
                     text-white rounded-md backdrop-blur-lg border border-white/10"
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;