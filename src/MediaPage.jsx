import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "./Context.jsx";
import MediaModal from "./MediaModal.jsx";

const IMG = "https://image.tmdb.org/t/p/w342";

function MediaPage({ mode }) {
    const { id } = useParams();
    const [params] = useSearchParams();
    const location = useLocation();
    const q = params.get("q") || "";

    const { items, loading, error, load, clear } = useApi();
    const [selected, setSelected] = useState(null);

    let path;
    let title;
    if (mode === "movie") {
        path = "/movie/popular";
        title = "Movies";
    } else if (mode === "tv") {
        path = "/tv/popular";
        title = "TV Shows";
    } else if (mode === "genre") {
        path = `/discover/movie?with_genres=${id}`;
        title = location.state?.name || "Genre";
    } else {
        path = `/search/multi?query=${encodeURIComponent(q)}`;
        title = `Results for "${q}"`;
    }

    useEffect(() => {
        if (mode === "search" && !q.trim()) {
            clear();
            return;
        }
        load(path);
    }, [mode, path, q, load, clear]);

    return (
        <main className="media-page">
            <h2>{title}</h2>

            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong: {error}</p>}
            {!loading && !error && items.length === 0 && <p>Nothing found.</p>}

            <div className="media-grid">
                {items.map((item) => {
                    const name = item.title || item.name;

                    return (
                        <div
                            key={`${item.media_type || mode}-${item.id}`}
                            className="media-card cards"
                            onClick={() => setSelected(item)}
                        >
                            {item.poster_path ? (
                                <img src={`${IMG}${item.poster_path}`} alt={name} loading="lazy" />
                            ) : (
                                <div className="media-noimg">No image</div>
                            )}

                            <div className="recent-buttons">
                                <button
                                    type="button"
                                    className="watch"
                                    aria-label={`Watch Now: ${name}`}
                                >
                                    <span>Watch Now</span>
                                </button>

                                <div className="rating">
                                    <i className="fa-regular fa-star" aria-hidden="true"></i>
                                    <span>{item.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <MediaModal
                item={selected}
                mediaType={mode === "tv" ? "tv" : "movie"}
                onClose={() => setSelected(null)}
            />
        </main>
    );
}

export default MediaPage;