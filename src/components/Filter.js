import React from 'react';

export default function Search(props) {
  return (
    <div className="Filter">
      <select onChange={props.handlePrintChange} id="print-type">
        <option value="all">All</option>
        <option value="books">Books</option>
        <option value="magazines">Magazines</option>
      </select>
      <select id="book-type">
        <option value="no-filter">No Filter</option>
        <option value="e-books">eBooks</option>
        <option value="free-e-books">Free eBooks</option>
        <option value="full">Full</option>
        <option value="paid-e-books">Paid eBooks</option>
        <option value="partial">Partial</option>
      </select>
    </div>
  );
}
