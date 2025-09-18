import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, suggestions = [], placeholder = "Search resources..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filtered = suggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, suggestions]);

  const handleSearch = () => {
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => searchTerm?.length > 0 && setShowSuggestions(true)}
            className="pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={clearSearch}
                className="w-5 h-5 hover:bg-muted"
              />
            )}
            <Icon name="Search" size={16} className="text-muted-foreground" />
          </div>
        </div>
        <Button
          variant="default"
          iconName="Search"
          onClick={handleSearch}
          className="px-6"
        >
          Search
        </Button>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md card-shadow z-50">
          {filteredSuggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-muted smooth-transition first:rounded-t-md last:rounded-b-md flex items-center"
            >
              <Icon name="Search" size={14} className="mr-2 text-muted-foreground" />
              <span className="text-sm">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;