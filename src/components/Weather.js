import React, { Component } from 'react'
import axios from 'axios';
import CurrentIcon from './Icon'
import Loader from '../assets/SVG/loader.svg'

const darkskyKey = 'a454df907d79a1e59fe04ca230be5860';
const darkskyBaseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';

export default class Weather extends Component {

    state = {
        weeklyWeather: [],
        apparentTemperature: [],
        icon: [],
        temperature: [],
        time: [],
        humidity: [],
        windSpeed: [],
        summary: [],
        city: [],
        hourly: [],
        isLoading: true,
    }

    componentDidMount() {
        document.querySelector('.container-two').style.display = 'none';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`${darkskyBaseUrl}${darkskyKey}/${position.coords.latitude},${position.coords.longitude}?units=si`)
                    .then(res => {
                        this.setState({
                            weeklyWeather: res.data.daily.data,
                            apparentTemperature: res.data.currently.apparentTemperature,
                            icon: res.data.currently.icon,
                            temperature: res.data.currently.temperature,
                            time: res.data.currently.time,
                            humidity: res.data.currently.humidity,
                            windSpeed: res.data.currently.windSpeed,
                            summary: res.data.currently.summary,
                            city: res.data.timezone,
                            hourly: res.data.hourly.data,
                            isLoading: false
                        })
                    })
            })
        }
    }

    render() {
        const weeklyWeather = this.state.weeklyWeather
        const weeklyWeatherList = weeklyWeather.map(weatherPerDay => {
            return (
                <div className="card-two" key={weatherPerDay.time}>
                    <div className="card-body">
                        <h5 className="card-title">{new Date(weatherPerDay.time * 1000).toDateString()} {weatherPerDay.city}</h5>
                        <CurrentIcon icon={weatherPerDay.icon} />
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Max: <strong>{weatherPerDay.temperatureMax}°</strong></li>
                        <li className="list-group-item">Min: <strong> {weatherPerDay.temperatureMin}°</strong></li>
                        <li className="list-group-item-one">Sunrise:  {new Date(weatherPerDay.sunriseTime * 1000).toLocaleString('it-IT')}</li>
                        <li className="list-group-item-one">Sunset:  {new Date(weatherPerDay.sunsetTime * 1000).toLocaleString('it-IT')}</li>
                    </ul>
                </div>
            )
        })

        let hourly = this.state.hourly
        let result = []

        for (let i = 0; i < 24; i += 3) {
            if (hourly[i]) {
                result.push(hourly[i])
            }
        }

        let weatherData;
        if (result.length > 0) {
            weatherData = result.map(data => {
                return (
                    <div className="card-hour" key={data.time}>
                        <div className="card-body-hour">
                            <h5 className="card-title">{new Date(data.time * 1000).toLocaleString('it-IT')}</h5>
                            <CurrentIcon icon={data.icon} />
                            <p>{data.temperature}°</p>
                        </div>
                    </div>
                )
            })
        } else {

        }
        if (this.state.isLoading) {
            return (
                <div className="loading">
                    <img src={Loader} alt="Loading..."></img>
                    <p>Loading...</p>
                </div>
            )
        } else {
            return (
                <section>
                    <div className="container-one">
                        <h5>Weather in {this.state.city}</h5>
                        <div className="wrap">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{new Date(this.state.time * 1000).toDateString()}</h5>
                                    <p className="temp">{this.state.temperature}°</p>
                                    <div className="img-wrap">
                                        <CurrentIcon icon={this.state.icon} />
                                    </div>
                                    <p className="card-text">{this.state.summary}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Windspeed: {this.state.windSpeed}</li>
                                    <li className="list-group-item">Humidity: {this.state.humidity}</li>
                                    <li className="list-group-item">Feels like: {this.state.apparentTemperature}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="wrap-three">{weatherData}</div>
                        <div className="wrap-two">
                            {weeklyWeatherList}
                        </div>
                    </div>
                </section>
            )
        }
    }
}




