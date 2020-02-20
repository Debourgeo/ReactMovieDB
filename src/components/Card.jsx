import React from "react";

const Card = props => {
    let data = props.data;
    let image = `https://image.tmdb.org/t/p/w200${props.data.image_path}`;
    let background = `https://image.tmdb.org/t/p/w500${props.data.background_path}`;
    let trailer = `https://www.youtube.com/watch?v=${props.data.trailer_path}`;
    return (
        <div className="card">
            <img src={image} alt="this is a alt" />
            <img src={background} alt="this is a alt" />
            <a href={trailer}>trailer link</a>

            <h1>{data.title}</h1>

            <p>{data.tagline}</p>
            <p>{data.synopsis}</p>
            <p>{data.date}</p>
            <p>{data.runtime}</p>
            <p>{data.score} / 10</p>
            <ul className="genres">
                {data.genres.map((element, index) => {
                    return (
                        <li className="genre" key={index}>
                            {element.name}
                        </li>
                    );
                })}
            </ul>
            <ul className="actors">
                {data.cast.map((element, index) => {
                    return (
                        <li className={element.role} key={index}>
                            {element.name}
                        </li>
                    );
                })}
            </ul>
            <ul className="prod">
                {data.prod.map((element, index) => {
                    return (
                        <li className={element.role} key={index}>
                            {element.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Card;
