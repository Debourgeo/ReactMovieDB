import React from "react";

const Search = props => {
    let data = props.data;
    let handleChange = props.onChange;
    let handleClick = props.onClick;

    if (data.suggestions === "empty") {
        return (
            <div className="searchArea">
                <div className="searchBox">
                    <input id="input-field" type="text" placeholder="search" value={data.value} onChange={handleChange} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="searchArea">
                <div className="searchBox">
                    <input id="input-field" type="text" placeholder="search" value={data.value} onChange={handleChange} />
                </div>
                <ul className="searchResults">
                    {data.suggestions.map(suggestion => {
                        return (
                            <li key={suggestion.movieID} data={suggestion.movieID} onClick={handleClick}>
                                {suggestion.movieName}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
};

export default Search;
