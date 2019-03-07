import React, { Component } from 'react'
import CurrentIcon from './Icon'

export default class WeatherSearch extends Component {
    render() {

        const weeklyWeather = this.props.weeklyWeatherSearch
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
        }),

            weatherSearchResult = () => {
                if (this.props.temperature !== null) {
                    return (
                        <div className="container-two">
                            <h5>Weather in {this.props.city}</h5>
                            <div className="wrap">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{new Date(this.props.time * 1000).toDateString()}</h5>
                                        <p className="temp">{this.props.temperature}°</p>
                                        <div className="img-wrap">
                                            <CurrentIcon icon={this.props.icon} />
                                        </div>
                                        <p className="card-text">{this.props.summary}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Windspeed: {this.props.windSpeed}</li>
                                        <li className="list-group-item">Humidity: {this.props.humidity}</li>
                                        <li className="list-group-item">Temperature: {this.props.temperature}</li>
                                        <li className="list-group-item">Feels like: {this.props.apparentTemperature}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <h1>Something went wrong, please try search again</h1>
                    )
                }
            }

        return (
            <section>
                {weatherSearchResult()}
                <div className="wrap-two">
                    {weeklyWeatherList}
                </div>
            </section>
        )
    }
}

