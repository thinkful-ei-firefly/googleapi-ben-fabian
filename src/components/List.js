import React from 'react';
import Book from './Book';

export default function List(props) {
  return (
    <div className="List">
      { props.books.map(book => {return <Book key={book.id} book={book}/> }) }
    </div>
  );
}
