import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css'; // optional for styling

const SearchResults = () => {
  const location = useLocation();
  const { results = [], make } = location.state || {};

  // Ensure at least 3 items by repeating or filling
  const extendedResults = [...results];
  while (extendedResults.length < 3) {
    extendedResults.push(...results);
  }
  const displayedResults = extendedResults.slice(0, 3);

  if (!results || results.length === 0) {
    return (
      <div className="searchResultsContainer">
        <h2>No results found.</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="searchResultsContainer">
      <h2>Search Results for "{make}"</h2>
      <div className="resultsGrid">
        {displayedResults.map((car, index) => (
          <div key={index} className="carCard">
            <img src={car.image} alt={`${car.Make_Name} ${car.Model_Name}`} className="carImage" />
            <h3>{car.Make_Name}</h3>
            <p>{car.Model_Name}</p>
          </div>
        ))}
      </div>
      <Link to="/">Back to Search</Link>
    </div>
  );
};

export default SearchResults;
