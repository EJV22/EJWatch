import { useState, useEffect, createContext } from "react";

export const ApiContext = createContext();

function ContextProvider ({children}) {

    const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS;

    const API_URL = "https://api.themoviedb.org/3";

    const [movies, setMovies] = useState([]);

    const search = async (title, type) => {

        let url;

        if (!title && type === "movie") {
            url = `${API_URL}/movie/popular`;
        } else if (!title && type === "tv") {
            url = `${API_URL}/tv/popular`;
        } else if (!title) {
            url = `${API_URL}/trending/all/day`;
        } else if (type === "tv") {
            url = `${API_URL}/search/tv?query=${encodeURIComponent(title)}`;
        } else {
            url = `${API_URL}/search/movie?query=${encodeURIComponent(title)}`;
        }

        const response = await fetch(url, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });

        const data = await response.json();

        console.log(data);

        if (data.results) {
            setMovies(data.results);
        } else {
            setMovies([]);
        }
    };

    useEffect(() => {
    search();   }, []);

    return (

        <ApiContext.Provider value={ {API_URL, movies, search} }>
            {children}
        </ApiContext.Provider>
    );
}

export default ContextProvider;