import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Weather from './components/Weather';
import Search from './components/Search';
import WeatherSearch from './components/WeatherSearch';

const locationKey = 'D3bucmtmT9Y2J2ObSbiR3pVOsaB4baUE';
const locationBaseUrl = 'http://open.mapquestapi.com/geocoding/v1/address?key=';

const darkskyKey = 'a454df907d79a1e59fe04ca230be5860';
const darkskyBaseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';

class App extends Component {
  state = {
    weeklyWeatherSearch: [],
    lat: [],
    lng: [],
    apparentTemperature: [],
    icon: [],
    temperature: [],
    time: [],
    humidity: [],
    windSpeed: [],
    summary: [],
    city: [],
  }

  getLocationThenWeather = (e) => {
    e.preventDefault();
    document.querySelector('.container-one').style.display = 'none';
    document.querySelector('.container-two').style.display = '';
    const searchString = e.target.elements.search.value;
    fetch(`${locationBaseUrl}${locationKey}&location=${searchString}`).then(res => res.json())
      .then(data => {
        this.setState({
          lat: data.results[0].locations[0].latLng.lat,
          lng: data.results[0].locations[0].latLng.lng,
        })
        console.log(this.state)
      })
      .then(() => {
        fetch(`${darkskyBaseUrl}${darkskyKey}/${this.state.lat}, ${this.state.lng}?units=si`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              weeklyWeatherSearch: data.daily.data,
              apparentTemperature: data.currently.apparentTemperature,
              icon: data.currently.icon,
              temperature: data.currently.temperature,
              time: data.currently.time,
              humidity: data.currently.humidity,
              windSpeed: data.currently.windSpeed,
              summary: data.currently.summary,
              city: data.timezone
            })
          })
      })
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <Search getLocationThenWeather={this.getLocationThenWeather} />
        <Weather />
        <WeatherSearch
          weeklyWeatherSearch={this.state.weeklyWeatherSearch}
          apparentTemperature={this.state.apparentTemperature}
          icon={this.state.icon}
          temperature={this.state.temperature}
          time={this.state.time}
          humidity={this.state.humidity}
          windSpeed={this.state.windSpeed}
          summary={this.state.summary}
          city={this.state.city} />
        <Footer />
      </div>
    );
  }
}

export default App;
