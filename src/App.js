import React from "react";
import "./sass/style.scss";
import Card from "./components/Card";
import Search from "./components/Search";

class App extends React.Component {
    constructor() {
        super();

        this.state = { id: 155, isLoading: true, value: "", suggestions: [] }; // IDs : 155, 278, 19404, 129, 124
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
            if (element.department === "Directing" && element.job === "Director") {
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

        let noDupes = writing.filter((element, index) => writing.indexOf(element) === index);

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
            this.setState({ isLoading: true });

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

    handleChange(event) {
        let input = event.target.value;
        console.log(input);
        this.setState({ value: input });
        if (input !== "") {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=cfe422613b250f702980a3bbf9e90716`)
                .then(response => response.json())
                .then(data => {
                    let suggestionsArray = [];
                    let i = 0;
                    let size;
                    if (data.total_results === 0) {
                        this.setState({ suggestions: "empty" });
                    } else {
                        if (data.total_results < 5) {
                            size = data.total_results;
                        } else {
                            size = 5;
                        }
                        do {
                            suggestionsArray.push({ movieName: data.results[i].title, movieID: data.results[i].id });
                            i++;
                        } while (i < size);
                        this.setState({ suggestions: suggestionsArray });
                    }
                });
        } else {
            this.setState({ suggestions: "empty" });
        }
    }

    handleClick(event) {
        let match = event.target;
        document.getElementById("input-field").value = match.innerHTML;
        let newID = parseInt(match.getAttribute("data"));
        console.log(newID);
        this.setState({ id: newID }, () => this.fetchAll(this.state.id));

        // this.setState({ id: newID }, () => {
        //     setTimeout(() => {
        //         this.setState(() => this.fetchAll(this.state.id));
        //     }, 500);
        // });
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        this.fetchAll(this.state.id);
    }

    componentDidUpdate() {}

    render() {
        let data = this.state;
        let isLoading = this.state.isLoading;

        if (isLoading) {
            document.body.style.backgroundColor = "blue";
            return <p>loading ...</p>;
        } else {
            document.body.style.backgroundImage = data.background_path ? `url(https://image.tmdb.org/t/p/original${data.background_path})` : "";

            return (
                <div className="container">
                    <Search data={data} onChange={this.handleChange} onClick={this.handleClick} />
                    <Card data={data} />
                </div>
            );
        }
    }
}

export default App;
