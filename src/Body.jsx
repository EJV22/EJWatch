import { useEffect, useState } from "react";
import { tmdbFetch } from "./api.js";
import MediaModal from "./MediaModal.jsx";

const IMG = "https://image.tmdb.org/t/p";

 
const ROWS = [
    {
        title: "Trending Now",
        endpoint: "/trending/all/week", 
        type: "movie",                
        row: "features",
        card: "feature-card",
        buttons: "feature-buttons",
        image: "backdrop_path",   
        size: "w500",
    },
    {
        title: "Recently Added",
        endpoint: "/movie/now_playing",
        type: "movie",
        row: "recent",
        card: "recent-card",
        buttons: "recent-buttons",
        image: "poster_path",  
        size: "w342",
    },
    {
        title: "New TV Shows",
        endpoint: "/tv/on_the_air",
        type: "tv",
        row: "tv-shows",
        card: "tv-cards",
        buttons: "tv-buttons",
        image: "poster_path",
        size: "w342",
    },
];

function CardRow({ config, onSelect }) {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const controller = new AbortController();
        setStatus("loading");

        tmdbFetch(config.endpoint, { signal: controller.signal })
            .then((data) => {
            
                setItems(
                    (data.results || []).filter(
                        (item) => item.media_type !== "person" && item[config.image]
                    )
                );
                setStatus("done");
            })
            .catch((err) => {
                if (err.name !== "AbortError") setStatus("error");
            });

        return () => controller.abort();
    }, [config]);

    return (
        <>
            <h2>{config.title}</h2>

            <div className={config.row}>
                {status === "loading" && <p>Loading...</p>}
                {status === "error" && <p>Couldn't load this row.</p>}

                {items.map((item) => {
                    const name = item.title || item.name;

                    return (
                        <div
                            key={item.id}
                            className={`${config.card} cards`}
                            onClick={() => onSelect(item, item.media_type || config.type)}
                        >
                            <img
                                src={`${IMG}/${config.size}${item[config.image]}`}
                                alt={name}
                                loading="lazy"
                            />

                            <div className={config.buttons}>
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
        </>
    );
}

function Main() {
    const [selected, setSelected] = useState(null);

    return (
        <main className="main-container">
            {ROWS.map((config) => (
                <CardRow
                    key={config.title}
                    config={config}
                    onSelect={(item, type) => setSelected({ item, type })}
                />
            ))}

            <MediaModal
                item={selected?.item ?? null}
                mediaType={selected?.type}
                onClose={() => setSelected(null)}
            />
        </main>
    );
}

export default Main;