

function MovieCard ({movie}){

    const title = movie.title || movie.name;
    const date = movie.release_date || movie.first_air_date;

    return(
        <movie className="movie-card">

            <div className="movie-poster">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/400"
                    }
                    alt={title}
                />
            </div>


            <div className="movie-desc">
                <h3>{title}</h3>
            </div>

        </movie>
    );
}

export default MovieCard;