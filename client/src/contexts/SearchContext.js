import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const updateFilterStatus = (status) => {
    setFilterStatus(status);
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, updateSearchTerm, filterStatus, updateFilterStatus }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export { SearchProvider, useSearch };
