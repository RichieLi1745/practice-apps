import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [search, setSearch] = useState('');
  const onSearch = (e) => {
    setSearch(e.target.value);
  }
  const onSearchClick = () => {
    handleSearch(search);
  }

  return (
    <div>
      Search: <input placeholder="Search..." value={search} onChange={onSearch}/>
      <button onClick={onSearchClick}>Search</button>
    </div>
  )
}
export default Search;