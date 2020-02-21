import React from "react";
import "./sass/style.scss";
import Card from "./components/Card";

class App extends React.Component {
    constructor() {
        super();

        this.state = { id: 155, isLoading: true }; // IDs : 155, 278, 19404, 129, 124
    }

    getActors(cast) {
        let actors = [];
        for (let i = 0; i < 3; i++) {
            actors.push(cast[i].name);
        }

        return actors;
    }

    getDirection(crew) {
        let direction = [];

        crew.forEach(element => {
            if (
                element.department === "Directing" &&
                element.job === "Director"
            ) {
                direction.push(element.name);
            }
        });

        return direction;
    }

    getWriting(crew) {
        let writing = [];

        crew.forEach(element => {
            if (element.department === "Writing") {
                writing.push(element.name);
            }
        });

        let noDupes = writing.filter(
            (element, index) => writing.indexOf(element) === index
        );

        if (noDupes.length > 3) {
            noDupes.splice(3, noDupes.length - 3);
        }

        return noDupes;
    }

    async fetchAll(id) {
        let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7fdda1383403658b1323f3a67db3a801`;
        let urlCrew = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7fdda1383403658b1323f3a67db3a801`;
        let urlMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=7fdda1383403658b1323f3a67db3a801`;
        try {
            let responseTrailer = await fetch(urlTrailer);
            let dataTrailer = await responseTrailer.json();

            let responseCrew = await fetch(urlCrew);
            let dataCrew = await responseCrew.json();

            let responseMovie = await fetch(urlMovie);
            let dataMovie = await responseMovie.json();

            this.setState({
                isLoading: false,
                id: dataMovie.id,
                title: dataMovie.original_title,
                tagline: dataMovie.tagline,
                synopsis: dataMovie.overview,
                date: dataMovie.release_date,
                runtime: dataMovie.runtime,
                score: dataMovie.vote_average,
                cast: this.getActors(dataCrew.cast),
                direction: this.getDirection(dataCrew.crew),
                writing: this.getWriting(dataCrew.crew),
                genres: dataMovie.genres,
                trailer_path: dataTrailer.results[0].key,
                image_path: dataMovie.poster_path,
                background_path: dataMovie.backdrop_path
            });
            console.log(this.state);
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        this.fetchAll(this.state.id);
    }

    render() {
        let data = this.state;
        let isLoading = this.state.isLoading;
        let background = `url(https://image.tmdb.org/t/p/original${data.background_path})`;
        // document.body.setAttribute("background-image", background);

        if (isLoading) {
            return <p>loading ...</p>;
        } else if (!isLoading) {
            document.body.style.backgroundImage = background;
            return (
                <div className="container">
                    <Card data={data} />
                </div>
            );
        }
    }
}

export default App;
