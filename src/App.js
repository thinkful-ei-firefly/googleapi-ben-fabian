import React from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search'

class App extends React.Component {

  status = {

  }

  render(){
    return (
      <div className="App">
        <Header />
        <Search />
        
        
      </div>
    );
  }
}

export default App;
