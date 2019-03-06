import React, { Component } from 'react'
import axios from 'axios';
import CurrentIcon from './Icon'

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
    }

    //Get weather based on geolocation
    componentDidMount() {
        document.querySelector('.container-two').style.display = 'none';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a454df907d79a1e59fe04ca230be5860/${position.coords.latitude},${position.coords.longitude}?units=si`)
                    .then(res => {
                        console.log(res);
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
                            hourly: res.data.hourly.data
                        })
                        console.log(this.state)
                    })
            })
        }
        else {
            console.log('Could not get position, please search for a city')
        }
    }

    weatherHour = () => {
        let hourly = this.state.hourly
        console.log(hourly)
        for (let i = 0; i < 24; i += 3) {
            console.log(hourly[i])
        }
    }

    render() {


        //Stats of current weather 
        //loop thro sarch results and render
        const weeklyWeather = this.state.weeklyWeather
        const weeklyWeatherList = weeklyWeather.map(weatherPerDay => {
            return (
                <div className="card-two" key={weatherPerDay.time}>
                    <div className="card-body">
                        <h5 className="card-title">{new Date(weatherPerDay.time * 1000).toDateString()} {weatherPerDay.city}</h5>
                        <CurrentIcon icon={weatherPerDay.icon} />
                        <p className="card-text">{weatherPerDay.summary}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Max: <strong>{weatherPerDay.temperatureMax}°</strong></li>
                        <li className="list-group-item">Min: <strong> {weatherPerDay.temperatureMin}°</strong></li>
                        <li className="list-group-item-one">Sunrise:  {new Date(weatherPerDay.sunriseTime * 1000).toTimeString()}</li>
                        <li className="list-group-item-one">Sunset:  {new Date(weatherPerDay.sunsetTime * 1000).toTimeString()}</li>
                    </ul>
                </div>
            )
        })

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
                                <li className="list-group-item">Temperature: {this.state.temperature}</li>
                                <li className="list-group-item">Feels like: {this.state.apparentTemperature}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrap-two">
                        {weeklyWeatherList}
                    </div>
                </div>
                <button onClick={this.weatherHour}>hej</button>
            </section>
        )
    }
}




