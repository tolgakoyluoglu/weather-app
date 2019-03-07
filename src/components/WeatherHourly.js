import React from 'react'

export default function WeatherHourly(props) {

    let hourly = props.hourly
    let result = []

    for (let i = 0; i < 24; i += 3) {
        if (hourly[i]) {
            result.push(hourly[i])
        }

    }

    console.log(result)

    let weatherData;
    if (result.length > 0) {
        weatherData = result.map(data => {
            return (<p>{data.summary}</p>)
        })
    } else {
        weatherData = (<p>...Loading</p>)
    }

    return (
        <h1>{weatherData}</h1>
    )


}

