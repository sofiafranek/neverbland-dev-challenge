import React, { useState } from 'react';
import './style.scss';

const Search = (props) => {
  const [search, setSearch] = useState('');

  const startSearch = (event) => {
    const search = event.target.value;
    setSearch(search);
    props.search(search);
  };

  return (
    <div>
      <form>
        <input
          type="search"
          name="search"
          value={search}
          onChange={startSearch}
          placeholder="Search..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Search;
