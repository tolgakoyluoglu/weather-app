import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Weather from './components/Weather';
import Search from './components/Search';

class App extends Component {

  state = {
    weeklyWeather: [],
    weeklyWeatherSearch: [],
    lat: [],
    lng: [],
  }

  getLocationThenWeather = (e) => {
    e.preventDefault();
    const searchString = e.target.elements.search.value;
    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=D3bucmtmT9Y2J2ObSbiR3pVOsaB4baUE&location=${searchString}`).then(res => res.json())
      .then(data => {
        this.setState({
          lat: data.results[0].locations[0].latLng.lat,
          lng: data.results[0].locations[0].latLng.lng,
        })
      })
      .then(() => {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a454df907d79a1e59fe04ca230be5860/${this.state.lat}, ${this.state.lng}?units=si`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            this.setState({
              weeklyWeatherSearch: data.daily.data
            })
            console.log(this.state)
          })
      })
  }





  render() {

    return (
      <div className="App">
        <Navbar />
        <Search getLocationThenWeather={this.getLocationThenWeather} />
        <Weather />
        <Footer />
      </div>
    );
  }
}

export default App;
