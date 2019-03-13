import React, { Component } from 'react'
import CurrentIcon from './Icon'


export default class WeatherSearch extends Component {

    render() {
        const weeklyWeather = this.props.weeklyWeather
        const weeklyWeatherList = weeklyWeather.map(weatherPerDay => {
            return (
                <div className="card-two" key={weatherPerDay.time}>
                    <div className="card-body">
                        <h5 className="card-title">{new Date(weatherPerDay.time * 1000).toDateString()} {weatherPerDay.city}</h5>
                        <CurrentIcon icon={weatherPerDay.icon} />
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Max: <strong>{this.props.celsius ? ((weatherPerDay.temperatureMax - 32) * 5 / 9).toFixed() + ' °F' : weatherPerDay.temperatureMax.toFixed() + ' °C'}</strong></li>
                        <li className="list-group-item">Min: <strong> {this.props.celsius ? ((weatherPerDay.temperatureMin - 32) * 5 / 9).toFixed() + ' °F' : weatherPerDay.temperatureMin.toFixed() + ' °C'}</strong></li>
                    </ul>
                </div>
            )
        }),

            weatherSearchResult = () => {
                if (this.props.temperature !== null) {
                    return (
                        <div className="container-two">
                            <h5>Weather in {this.props.city}</h5>
                            <button className="toggleTemp" onClick={this.props.toggleTemp}>°F / °C</button>
                            <div className="wrap">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{new Date(this.props.time * 1000).toDateString()}</h5>
                                        <p className="temp">{this.props.celsius ? ((this.props.temperature - 32) * 5 / 9).toFixed() + ' °F' : this.props.temperature + ' °C'}</p>
                                        <div className="img-wrap">
                                            <CurrentIcon icon={this.props.icon} />
                                        </div>
                                        <p>{this.props.summary}</p>
                                    </div>
                                    <ul className="listone">
                                        <li className="list-group-item">Sunrise:  {new Date(this.props.weeklyweatherDayOne.sunriseTime * 1000).toLocaleString('it-IT')}</li>
                                        <li className="list-group-item">Sunset:  {new Date(this.props.weeklyweatherDayOne.sunsetTime * 1000).toLocaleString('it-IT')}</li>
                                        <li className="list-group-item">Windspeed: {this.props.windSpeed} km/h</li>
                                        <li className="list-group-item">Humidity: {(this.props.humidity * 100).toFixed(0)} %</li>
                                        <li className="list-group-item">Feels like: {this.props.celsius ? ((this.props.apparentTemperature - 32) * 5 / 9).toFixed() + ' °F' : this.props.apparentTemperature + ' °C'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="loading">
                            <p>No results please try search again</p>
                        </div>
                    )
                }
            }

        let hourly = this.props.hourly
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
                            <p>{this.props.celsius ? ((data.temperature - 32) * 5 / 9).toFixed() + ' °F' : data.temperature.toFixed() + ' °C'}</p>
                        </div>
                    </div>
                )
            })
        }

        return (
            <section>
                {weatherSearchResult()}
                <div className="wrap-three">
                    {weatherData}</div>
                <div className="wrap-two">
                    {weeklyWeatherList}
                </div>
            </section>
        )

    }
}

