import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GENRES } from "./genres.js";

function GenresDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div className="genres" ref={ref}>
            <button
                type="button"
                className="genres-btn"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((o) => !o)}
            >
                Genres
                <i className="fa-solid fa-angle-down" aria-hidden="true"></i>
            </button>

            {open && (
                <ul className="genres-menu">
                    {GENRES.map((genre) => (
                        <li key={genre.id}>
                            <Link
                                to={`/genre/${genre.id}`}
                                state={{ name: genre.name }}
                                onClick={() => setOpen(false)}
                            >
                                {genre.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GenresDropdown;