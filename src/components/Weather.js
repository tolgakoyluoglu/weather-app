import React, { Component } from 'react'
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
        celsius: false,
    }

    componentDidMount() {
        document.querySelector('.container-two').style.display = 'none';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`${darkskyBaseUrl}${darkskyKey}/${position.coords.latitude},${position.coords.longitude}?units=si`)
                    .then(res => res.json()).then(res => {
                        this.setState({
                            weeklyWeather: res.daily.data,
                            apparentTemperature: res.currently.apparentTemperature,
                            icon: res.currently.icon,
                            temperature: res.currently.temperature,
                            time: res.currently.time,
                            humidity: res.currently.humidity,
                            windSpeed: res.currently.windSpeed,
                            summary: res.currently.summary,
                            city: res.timezone,
                            hourly: res.hourly.data,
                            isLoading: false
                        })
                        console.log(this.state)
                    })
            })
        }
    }

    toggleTemp = () => {
        this.setState({
            celsius: !this.state.celsius
        })
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
                        <li className="list-group-item">Max: <strong>{this.state.celsius ? ((weatherPerDay.temperatureMax - 32) * 5 / 9).toFixed() + ' °F' : weatherPerDay.temperatureMax.toFixed() + ' °C'}</strong></li>
                        <li className="list-group-item">Min: <strong> {this.state.celsius ? ((weatherPerDay.temperatureMin - 32) * 5 / 9).toFixed() + ' °F' : weatherPerDay.temperatureMin.toFixed() + ' °C'}</strong></li>
                    </ul>
                </div>
            )
        })

        let hourly = this.state.hourly
        let result = []

        for (let i = 0; i < 25; i += 3) {
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
                            <p>{this.state.celsius ? ((data.temperature - 32) * 5 / 9).toFixed() + ' °F' : data.temperature.toFixed() + ' °C'}</p>
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
                        <button className="toggleTemp" onClick={this.toggleTemp}>°F / °C</button>
                        <div className="wrap">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{new Date(this.state.time * 1000).toDateString()}</h5>
                                    <p className="temp">{this.state.celsius ? ((this.state.temperature - 32) * 5 / 9).toFixed() + ' °F' : this.state.temperature.toFixed() + ' °C'}</p>
                                    <div className="img-wrap">
                                        <CurrentIcon icon={this.state.icon} />
                                    </div>
                                    <p>{this.state.summary}</p>
                                </div>
                                <ul className="listone">
                                    <li className="list-group-item">Sunrise:  {new Date(this.state.weeklyWeather[0].sunriseTime * 1000).toLocaleString('it-IT')}</li>
                                    <li className="list-group-item">Sunset:  {new Date(this.state.weeklyWeather[0].sunsetTime * 1000).toLocaleString('it-IT')}</li>
                                    <li className="list-group-item">Windspeed: {this.state.windSpeed} km/h</li>
                                    <li className="list-group-item">Humidity: {(this.state.humidity * 100).toFixed(0)} %</li>
                                    <li className="list-group-item">Feels like: {this.state.celsius ? ((this.state.temperature - 32) * 5 / 9).toFixed() + ' °F' : this.state.temperature.toFixed() + ' °C'}</li>
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




