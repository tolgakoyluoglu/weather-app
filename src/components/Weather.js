import React, { Component } from 'react'
import axios from 'axios';
import CurrentIcon from './Icon'

export default class Weather extends Component {

    state = {
        weeklyWeather: [],
    }

    //Get weather based on geolocation
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a454df907d79a1e59fe04ca230be5860/${position.coords.latitude},${position.coords.longitude}?units=si`)
                    .then(res => {
                        console.log(res);
                        this.setState({
                            weeklyWeather: res.data.daily.data
                        })
                        console.log(res.data.daily.data)
                    })
            })
        }
        else {
            console.log('Could not get position, please search for a city')
        }
    }

    render() {
        //loop thro sarch results and render
        const weeklyWeather = this.state.weeklyWeather
        const weeklyWeatherList = weeklyWeather.map(weatherPerDay => {
            return (
                <div className="card" key={weatherPerDay.time}>
                    <div className="card-body">
                        <h5 className="card-title">{new Date(weatherPerDay.time * 1000).toDateString()} {weatherPerDay.city}</h5>
                        <CurrentIcon currentIcon={weatherPerDay.icon} icon={weatherPerDay.icon} />
                        <p className="card-text">{weatherPerDay.summary}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Max: <strong>{weatherPerDay.temperatureMax}°C</strong></li>
                        <li className="list-group-item">Min: <strong> {weatherPerDay.temperatureMin}°C</strong></li>
                    </ul>
                </div>
            )
        })

        return (
            <div className="container">
                {weeklyWeatherList}
            </div>

        )
    }
}


