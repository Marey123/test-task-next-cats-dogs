import { useState, useEffect, FC } from "react";
import BreedCardInterface from "../../types/BreedCard";

interface SearchProps {
  breeds: BreedCardInterface[];
  onFilteredBreedsChange: (filteredBreeds: BreedCardInterface[]) => void;
}

const Search: FC<SearchProps> = ({ breeds, onFilteredBreedsChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const updateSuggestions = (term: string) => {
    const filteredSuggestions = breeds
      .filter(breed => breed.name.toLowerCase().includes(term.toLowerCase()))
      .map(breed => breed.name);
    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 1);
  };

  useEffect(() => {
    const filtered = breeds.filter(breed =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilteredBreedsChange(filtered);

    if (searchTerm) {
      updateSuggestions(searchTerm);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, breeds, onFilteredBreedsChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search 🔎"
        className="w-full p-2 border rounded-lg"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
