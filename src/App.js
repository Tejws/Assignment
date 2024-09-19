import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '38ea5e7c8561a585923cb35fd520dfa3';
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setMovies(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching the movies:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading movies...</div>;
    }

    return (
        <div className="App">
            <h1>Upcoming Movies</h1>
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                        <h2>{movie.title}</h2>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
