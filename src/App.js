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

  printSelectValue = 'all';
  typeSelectValue = 'no-filter';

  handleDestructure = obj => {
    return obj.items.map(book =>
      { 
        const { id, volumeInfo, saleInfo } = book;
        const { authors, description, title, imageLinks } = volumeInfo;
        const { smallThumbnail } = imageLinks;
        const { listPrice } = saleInfo;

        const newObject = {
            id,
            title,
            authors,
            description,
            smallThumbnail,
          }

        if (!listPrice){
          newObject.listPrice = "Free";
        }else{
          newObject.listPrice =  "$" + listPrice.amount;
        }
        return newObject;
      }
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
    let query = e.currentTarget.search.value;
    console.log(this.typeSelectValue);
    if (this.printSelectValue !== 'all') {
      query+= '&printType=' + this.printSelectValue;
    }
    if (this.typeSelectValue !== 'no-filter') {
      query+= '&filter=' + this.typeSelectValue;
    }
    const URL = this.handleURL(query);
    this.handleFetch(URL);
    console.log(URL);
  };

  handlePrintChange = e => {
    this.printSelectValue = e.currentTarget.value;
  }

  handleTypeChange = e => {
    this.typeSelectValue = e.currentTarget.value;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search handleSearch={this.handleSearch} />
        <Filter handlePrintChange={this.handlePrintChange} handleTypeChange={this.handleTypeChange} />
        <List books={this.state.books} />
      </div>
    );
  }
}

export default App;
