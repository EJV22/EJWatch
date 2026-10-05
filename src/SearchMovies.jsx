import { useState, useContext } from "react";
import { ApiContext } from "./Context";
import MovieCard from "./MovieCard";


function SearchMovies() {

    const { movies } = useContext(ApiContext);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextMovie = () => {
        
        setCurrentIndex(currentIndex + 4);
    };

    const prevMovie = () => {

        setCurrentIndex((currentIndex - 4 + movies.length) % movies.length);
    };

    const displayedMovies = [];

    if (movies.length > 0) {

        for (let i = 0; i < 4; i++) {

            displayedMovies.push(
                movies[(currentIndex + i) % movies.length]);
        }
    }
    

    return(
    <menu className="menu">

        {movies?.length > 0

            ? (
                <div className="carousel">

                    <button onClick={prevMovie}>
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </button>

                    <div className="movies-container">
                        {displayedMovies
                            .map((movie) => (
                                <MovieCard key ={movie.id}
                                    movie = {movie}/>
                        ))}
                
                    </div>

                    <button onClick={nextMovie}>
                        <i className="fa-solid fa-circle-chevron-right"></i>
                    </button>


                </div>

            ) : (
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )
        }
    </menu>
    );
}

export default SearchMovies;