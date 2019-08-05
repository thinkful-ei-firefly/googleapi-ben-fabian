import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Filter from './components/Filter';
import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null
    };
  }

  // handleDestructure = obj => {
  //   console.log('handleDestructure running');
  //   for (var {
  //     volumeInfo: { title: t },
  //     // saleInfo: {
  //     //   listPrice: { amount: a }
  //     // }
  //   } of obj.items) {
  //     console.log('Title: ' + t);
  //   }
  // };

  handleDestructure = obj => {
    obj.items.map(book =>
      { book.volumeInfo.title, book.saleInfo.listPrice.amount }
    );
  };

  handleFetch = url => {
    fetch(url)
      .then(res => res.json())
      .then(res => this.handleDestructure(res))
      .then(books => this.setState({ books }))
      .catch(error => console.log(error));
  };

  handleURL = query => {
    const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
    const API_KEY = '&key=AIzaSyC1O5z_V2IgWRZUA0LoxsLDmnA0_t5hRlU';
    return BASE_URL + query + API_KEY;
  };

  handleSearch = e => {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    // henry & filter=paid-ebooks & printType=books &
    const URL = this.handleURL(query);
    this.handleFetch(URL);
    console.log(URL);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Search handleSearch={this.handleSearch} />
        <Filter />
        <List books={this.state.books} />
      </div>
    );
  }
}

export default App;
