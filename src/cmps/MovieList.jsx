/* eslint-disable react/prop-types */
import MoviePreview from "./MoviePreview"

export default function MovieList({movies,deleteMovie}){

    return(
        <ul className="movie-list">
        {movies.map(movie => <MoviePreview key={movie._id} movie={movie} deleteMovie={deleteMovie} />)}
        </ul>
    )
} 
