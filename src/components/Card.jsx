import React from "react";

const addZero = element => {
    if (Number.isInteger(element) && element < 10) {
        element = `0${element}`;
    }
    return element;
};

const getDuration = runtime => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    return `${hours} h ${addZero(minutes)}`;
};

const getYear = date => {
    let year = date.split("-");
    return year[0];
};

const Card = props => {
    let data = props.data;
    let image = `https://image.tmdb.org/t/p/w500${props.data.image_path}`;
    let trailer = `https://www.youtube.com/watch?v=${props.data.trailer_path}`;
    return (
        <div className="card">
            <div className="left-side">
                <img src={image} alt="this is a alt" />
                <div className="figures">
                    <p>{getDuration(data.runtime)}</p>
                    <p>
                        {data.score} <span>/</span> 10
                    </p>
                </div>
                <a href={trailer}>Trailer</a>
            </div>

            <div className="right-side">
                <h1>
                    {data.title} ({getYear(data.date)})
                </h1>
                <h3>{data.tagline}</h3>

                <p>{data.synopsis}</p>
                <ul className="list genres">
                    {data.genres.map((element, index) => {
                        return (
                            <li className="genre" key={index}>
                                {element.name}
                            </li>
                        );
                    })}
                </ul>
                <ul className="list actors">
                    Starring:
                    {data.cast.map((actor, index) => {
                        return (
                            <li className="actor" key={index}>
                                {actor}
                            </li>
                        );
                    })}
                </ul>
                <ul className="list directors">
                    Directed by:
                    {data.direction.map((director, index) => {
                        return (
                            <li className="director" key={index}>
                                {director}
                            </li>
                        );
                    })}
                </ul>
                <ul className=" list writers">
                    Writed by:
                    {data.writing.map((writer, index) => {
                        return (
                            <li className="writer" key={index}>
                                {writer}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Card;
