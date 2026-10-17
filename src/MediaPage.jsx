import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { tmdbFetch } from "./api.js";
import MediaModal from "./MediaModal.jsx";

const IMG = "https://image.tmdb.org/t/p/w342";
const MAX_PAGES = 500;  

const keyOf = (item, mode) => `${item.media_type || mode}-${item.id}`;

 
const withPage = (path, n) => `${path}${path.includes("?") ? "&" : "?"}page=${n}`;

 
function MediaPage({ mode }) {
    const { id } = useParams();
    const [params] = useSearchParams();
    const location = useLocation();
    const q = params.get("q") || "";

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [moreError, setMoreError] = useState(null);
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
 

    const pathRef = useRef(path);
    pathRef.current = path;
 

    useEffect(() => {
        setPage(1);
        setTotalPages(1);
        setMoreError(null);

        if (mode === "search" && !q.trim()) {
            setItems([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        tmdbFetch(path, { signal: controller.signal })
            .then((data) => {
               
                setItems((data.results || []).filter((r) => r.media_type !== "person"));
                setTotalPages(data.total_pages || 1);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, [path, mode, q]);

   
    const loadMore = async () => {
        const requestedPath = path;
        const next = page + 1;

        setLoadingMore(true);
        setMoreError(null);

        try {
            const data = await tmdbFetch(withPage(requestedPath, next));
            if (pathRef.current !== requestedPath) return;   

            const fresh = (data.results || []).filter((r) => r.media_type !== "person");
            setItems((prev) => {
                const seen = new Set(prev.map((i) => keyOf(i, mode)));
                return [...prev, ...fresh.filter((i) => !seen.has(keyOf(i, mode)))];
            });
            setPage(next);
            setTotalPages(data.total_pages || totalPages);
        } catch (err) {
            if (pathRef.current === requestedPath) setMoreError(err.message);
        } finally {
            setLoadingMore(false);
        }
    };

    const hasMore = page < Math.min(totalPages, MAX_PAGES);

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
                            key={keyOf(item, mode)}
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

            {!loading && !error && items.length > 0 && hasMore && (
                <div className="load-more-wrap">
                    <button
                        type="button"
                        className="load-more"
                        onClick={loadMore}
                        disabled={loadingMore}
                    >
                        {loadingMore ? "Loading..." : "Load more"}
                    </button>
                </div>
            )}

            {moreError && (
                <p className="load-more-error">Couldn't load more: {moreError}</p>
            )}

            <MediaModal
                item={selected}
                mediaType={mode === "tv" ? "tv" : "movie"}
                onClose={() => setSelected(null)}
            />
        </main>
    );
}

export default MediaPage;