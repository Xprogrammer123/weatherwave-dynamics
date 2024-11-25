import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-md"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search city..."
          className="w-full px-4 py-2 pl-10 rounded-lg bg-white/20 backdrop-blur-lg
                     border border-white/10 focus:outline-none focus:ring-2 
                     focus:ring-white/20 transition-all"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </motion.div>
  );
};

export default SearchBar;