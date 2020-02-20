import React from "react";
import "./sass/style.scss";
import Card from "./components/Card";

class App extends React.Component {
    constructor() {
        super();

        this.state = { id: 28, isLoading: true }; // Apocalypse now ID
    }

    getActors(cast) {
        let actors = [];
        for (let i = 0; i < 3; i++) {
            actors.push({ role: "Actor", name: cast[i].name });
        }

        return actors;
    }

    getProd(crew) {
        let prod = [];

        crew.forEach(element => {
            if (
                element.job === "Director" ||
                element.job === "Producer" ||
                element.job === "Writer"
            ) {
                prod.push({ role: element.job, name: element.name });
            }
        });

        return prod;
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
                prod: this.getProd(dataCrew.crew),
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
        // let api_key = "7fdda1383403658b1323f3a67db3a801";
        let data = this.state;
        let isLoading = this.state.isLoading;
        let error = this.state.error;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>loading ...</p>;
        }
        return (
            <div className="card">
                <Card data={data} />
            </div>
        );
    }
}

export default App;
