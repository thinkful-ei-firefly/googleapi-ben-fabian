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

  handleDestructure = obj => {
    if (obj.totalItems === 0) {
      return [];
    } else {
      return obj.items.map(book => {
        const { id, volumeInfo, saleInfo, infoLink } = book;
        const { authors, description, title, imageLinks } = volumeInfo;
        const { listPrice } = saleInfo;

        const newObject = {
          id,
          title,
          authors,
          description,
          infoLink
        };

        if (!listPrice) {
          newObject.listPrice = 'Free';
        } else {
          newObject.listPrice = '$' + listPrice.amount;
        }

        if (imageLinks) {
          newObject.smallThumbnail = imageLinks.smallThumbnail;
        }
        return newObject;
      });
    }
  };

  handleFetch = url => {
    fetch(url)
      .then(res =>
        res.ok ? res.json() : Promise.reject('Something went wrong')
      )
      .then(res => this.handleDestructure(res))
      .then(books => this.setState({ books }))
      .catch(error => this.setState({error}));
  };

  handleURL = (form) => {
    const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
    const API_KEY = '&key=AIzaSyC1O5z_V2IgWRZUA0LoxsLDmnA0_t5hRlU';
    let query = form.search.value.trim(); // add something to strip whitespace
    if (!query) {
      this.setState({error: "Must input a search term."})
    } else {
      if (form.printType.value !== 'all') {
        query += '&printType=' + form.printType.value;
      }
      if (form.bookType.value !== 'no-filter') {
        query += '&filter=' + form.bookType.value;
      }
      const URL = BASE_URL + query + API_KEY;
      this.handleFetch(URL);
    }
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({error: null});
    this.handleURL(e.currentTarget);
  };

  handlePrintChange = e => {
    this.handleURL(e.currentTarget.form);
  };

  handleTypeChange = e => {
    this.handleURL(e.currentTarget.form);
  };

  render() {
    let content = <List books={this.state.books} />
    if (this.state.error) content = <div className="error">Error: {this.state.error}</div>
    return (
      <div className="App">
        <Header />
        <Search handleSearch={this.handleSearch} />
        <Filter
          handlePrintChange={this.handlePrintChange}
          handleTypeChange={this.handleTypeChange}
        />
        {content}
      </div>
    );
  }
}

export default App;
