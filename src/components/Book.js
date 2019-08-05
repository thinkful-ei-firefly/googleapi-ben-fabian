import React from 'react';

function Book(props){
	console.log(props)
	return (
		<div className="Item">
        <img src={ props.book.smallThumbnail } alt="some alt text" />
        <h2>{ props.book.title }</h2>
        <p>Author: { props.book.authors }</p>
        <p>Price: { props.book.listPrice }</p>
        <p>{ props.book.description }</p>
      </div>
      )
}

export default Book;