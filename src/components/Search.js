import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <form className="searchForm" onSubmit={this.props.getLocationThenWeather}>
                <input name="city" type="text" placeholder="Search for a city..."></input>
                <button className="submitBtn" type="submit">Search</button>
            </form>
        )
    }
}

