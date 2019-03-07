import React from 'react'
import CurrentIcon from './Icon'

export default function WeatherHourly(props) {

    let hourly = props.hourly
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
                <div className="card-hour">
                    <div className="card-body-hour">
                        <h5 className="card-title">{new Date(data.time * 1000).toDateString()}</h5>
                        <CurrentIcon icon={data.icon} />
                        <p>{data.temperature}</p>
                    </div>
                </div>
            )
        })
    } else {
        weatherData = (<p>...Loading</p>)
    }

    return (
        <div className="wrap-three">{weatherData}</div>
    )
}

