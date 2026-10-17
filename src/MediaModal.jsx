import { useEffect, useRef, useState } from "react";
import { tmdbFetch } from "./api.js";
import "./Carousel.css";

const POSTER = "https://image.tmdb.org/t/p/w342";
const BACKDROP = "https://image.tmdb.org/t/p/w780";

export default function MediaModal({ item, mediaType = "movie", onClose }) {
  const [details, setDetails] = useState(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!item) return;
    const controller = new AbortController();
    setDetails(null);
    const type = item.media_type || mediaType;

    tmdbFetch(`/${type}/${item.id}?append_to_response=videos`, {
      signal: controller.signal,
    })
      .then(setDetails)
      .catch((err) => {
        if (err.name !== "AbortError") setDetails({});
      });

    return () => controller.abort();
  }, [item, mediaType]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  const d = { ...item, ...details };
  const name = d.title || d.name;
  const date = d.release_date || d.first_air_date;
  const runtime = d.runtime ? `${Math.floor(d.runtime / 60)}h ${d.runtime % 60}m` : null;
  const trailer = d.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {d.backdrop_path && (
          <div className="modal-backdrop-img"
            style={{ backgroundImage: `url(${BACKDROP}${d.backdrop_path})` }}
          />
        )}

        <div className="modal-body">
          {d.poster_path && <img className="modal-poster" src={`${POSTER}${d.poster_path}`} alt={name} />}
          <div className="modal-info">
            <h3>{name}</h3>
            {d.tagline && <p className="modal-tagline">{d.tagline}</p>}
            <p className="modal-meta">
              ★ {d.vote_average?.toFixed(1)} ({d.vote_count?.toLocaleString()} votes)
              {date && ` · ${date.slice(0, 4)}`}
              {runtime && ` · ${runtime}`}
            </p>
            {d.genres?.length > 0 && (
              <div className="modal-genres">
                {d.genres.map((g) => (
                  <span key={g.id}>{g.name}</span>
                ))}
              </div>
            )}
            <p className="modal-overview">{d.overview || "No overview available."}</p>
            {trailer && (
              <a
                className="modal-trailer"
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶ Watch trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}