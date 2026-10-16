import { useEffect, useState } from "react";
import { tmdbFetch } from "./api.js";
import MediaModal from "./MediaModal.jsx";

const BACKDROP = "https://image.tmdb.org/t/p/w1280";

function Preview() {
    const [movie, setMovie] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        tmdbFetch("/trending/movie/week", { signal: controller.signal })
            .then((data) => {
                const withImages = (data.results || []).filter((m) => m.backdrop_path);
                if (withImages.length === 0) return;
                setMovie(withImages[Math.floor(Math.random() * withImages.length)]);
            })
            .catch(() => {});

        return () => controller.abort();
    }, []);

    return (
        <>
            <section className="preview">
                {movie && (
                    <>
                        <img src={`${BACKDROP}${movie.backdrop_path}`} alt="" />

                        <div className="desc">
                            <h2>{movie.title}</h2>

                            <div className="desc-buttons">
                                <button
                                    type="button"
                                    className="watch-now"
                                    onClick={() => setOpen(true)}
                                >
                                    <span>Watch now</span>
                                </button>

                                <div className="rating">
                                    <i className="fa-regular fa-star" aria-hidden="true"></i>
                                    <p>{movie.vote_average?.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>

            <MediaModal
                item={open ? movie : null}
                mediaType="movie"
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export default Preview;