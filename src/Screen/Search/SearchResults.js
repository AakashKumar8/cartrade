import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { results = [], make = '' } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="search-container">
      <h2>Car Models for: {make}</h2>
      {currentResults.length > 0 ? (
        <>
          <div className="car-grid">
            {currentResults.map((car) => {
              const imageUrl =
                car.image || `https://source.unsplash.com/400x250/?car,${car.Make_Name},${car.Model_Name}`;
              return (
                <div key={car.Model_ID} className="car-card">
                  <img
                    src={imageUrl}
                    alt={`${car.Make_Name} ${car.Model_Name}`}
                    className="car-image"
                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
                                    }}
                  />
                  <h3>{car.Make_Name} {car.Model_Name}</h3>
                  <p><strong>Price Range:</strong> {car.priceRange || 'N/A'}</p>
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-button">
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-button">
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No models found.</p>
      )}
    </div>
  );
};

export default SearchResults;
