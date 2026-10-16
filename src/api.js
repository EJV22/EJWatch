const API_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS;

export async function tmdbFetch(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            ...options.headers,
        },
    });

    if (!response.ok) throw new Error(`TMDB error ${response.status}`);

    return response.json();
}