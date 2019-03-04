import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Weather from './components/Weather';
import Search from './components/Search';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Navbar />
        <Search />
        <Weather />
        <Footer />
      </div>
    );
  }
}

export default App;
