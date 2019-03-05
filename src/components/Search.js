import React from 'react'

const Search = (props) => {

    return (
        <form className="searchForm" onSubmit={props.getLocationThenWeather}>
            <input name="search" type="text" placeholder="Search for a city..."></input>
            <button className="submitBtn" type="submit">Search</button>
        </form>
    )

}

export default Search

