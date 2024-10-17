import React from 'react';

const Pagination = ({ currentPage, totalProjects, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalProjects / itemsPerPage);

  return (
      <div className="pagination">
        <button
            onClick={() => onPageChange(-1)}
            disabled={currentPage === 1}
        >
          Back
        </button>
        <span>Page {currentPage}</span>
        <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
  );
};

export default Pagination;
