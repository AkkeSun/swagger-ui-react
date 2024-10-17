import React from 'react';

const SearchInput = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
      <input
          type="text"
          placeholder="Search projects..."
          className='search-input'
          onChange={handleInputChange}
      />
  );
};

export default SearchInput;
