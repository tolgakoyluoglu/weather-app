import React from 'react'
import Sun from '../assets/SVG/clear-day.svg';
import Night from '../assets/SVG/clear-night.svg';
import Cloudy from '../assets/SVG/cloud.svg';
import Fog from '../assets/SVG/fog.svg';
import PartlyCloudyDay from '../assets/SVG/partly-cloudy-day.svg';
import PartlyCloudyNight from '../assets/SVG/partly-cloudy-night.svg';
import Rain from '../assets/SVG/rain.svg';
import Sleet from '../assets/SVG/sleet.svg';
import Snow from '../assets/SVG/snow.svg';
import Wind from '../assets/SVG/wind.svg';

const currentIcon = (props) => {

    let iconImage = null;
    switch (props.icon) {
        case ('clear-day'):
            iconImage = Sun;
            break;
        case ('clear-night'):
            iconImage = Night;
            break;
        case ('cloudy'):
            iconImage = Cloudy;
            break;
        case ('fog'):
            iconImage = Fog;
            break;
        case ('partly-cloudy-day'):
            iconImage = PartlyCloudyDay;
            break;
        case ('partly-cloudy-night'):
            iconImage = PartlyCloudyNight;
            break;
        case ('rain'):
            iconImage = Rain;
            break;
        case ('sleet'):
            iconImage = Sleet;
            break;
        case ('snow'):
            iconImage = Snow;
            break;
        case ('wind'):
            iconImage = Wind;
            break;
    }

    return (
        <img className="card-img-top" src={iconImage} alt="Weather"></img>
    )
}

export default currentIcon

