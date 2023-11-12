// SearchPage.js
import React from "react";
import SearchResult from "./pages/testpage"; // Import SearchResult component

const SearchPage = ({ searchResults }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
    <ul>
      {searchResults.map((result, index) => (
        <SearchResult key={index} result={result} />
      ))}
    </ul>
  </div>
);

export default SearchPage;
