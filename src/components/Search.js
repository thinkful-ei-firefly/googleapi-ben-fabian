import React from 'react';

export default function Search(props) {
  return (
    <form onSubmit={props.handleSearch}>
      <label htmlFor="search">Search</label>
      <input id="search" />
      <button>Search</button>
    </form>
  );
}
