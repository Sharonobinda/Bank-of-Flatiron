import React from 'react';

const Search = ({ searchTerm, onSearchChange }) => (
  

  <div className="ui large fluid icon input m-3">
    {/* Input field for entering search term */}
    <input
      type="text"
      placeholder="Search your Recent Transactions"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <i className="circular search link icon"></i>
    </div>
  
);

export default Search;