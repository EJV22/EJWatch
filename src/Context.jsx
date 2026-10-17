import { useState, useEffect, useCallback, useRef, createContext } from "react";
import { tmdbFetch } from "./api.js";

export const ApiContext = createContext();

function ContextProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const controllerRef = useRef(null);

    const search = useCallback(async (title, type) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        const query = title?.trim();
        let path;

        if (!query && type === "movie") path = "/movie/popular";
        else if (!query && type === "tv") path = "/tv/popular";
        else if (!query) path = "/trending/all/day";
        else if (type === "tv") path = `/search/tv?query=${encodeURIComponent(query)}`;
        else path = `/search/movie?query=${encodeURIComponent(query)}`;

        setLoading(true);
        setError(null);

        try {
            const data = await tmdbFetch(path, { signal: controller.signal });
            setMovies(data.results || []);
        } catch (err) {
            if (err.name === "AbortError") return;
            setError(err.message);
            setMovies([]);
        } finally {
            if (controllerRef.current === controller) setLoading(false);
        }
    }, []);

    useEffect(() => {
        search();
    }, [search]);

    return (
        <ApiContext.Provider value={{ movies, search, loading, error }}>
            {children}
        </ApiContext.Provider>
    );
}

export default ContextProvider;