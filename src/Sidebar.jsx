import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GENRES } from "./genres.js";

function Sidebar({ open, onClose }) {
    const [genresOpen, setGenresOpen] = useState(false);
    const closeRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        closeRef.current?.focus();

        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    return (
        <>
            <div
                className={`sidebar-backdrop${open ? " open" : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                id="sidebar"
                className={`sidebar${open ? " open" : ""}`}
                aria-label="Menu"
            >
                <button
                    ref={closeRef}
                    type="button"
                    className="sidebar-close"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>

                <nav className="sidebar-nav">
                    <Link to="/" onClick={onClose}>Home</Link>
                    <Link to="/movie" onClick={onClose}>Movies</Link>
                    <Link to="/tv" onClick={onClose}>TV Shows</Link>

                    <button
                        type="button"
                        className="sidebar-genres-btn"
                        aria-expanded={genresOpen}
                        onClick={() => setGenresOpen((o) => !o)}
                    >
                        Genres
                        <i className="fa-solid fa-angle-down" aria-hidden="true"></i>
                    </button>

                    <div className={`sidebar-genres${genresOpen ? " open" : ""}`}>
                        <ul>
                            {GENRES.map((genre) => (
                                <li key={genre.id}>
                                    <Link
                                        to={`/genre/${genre.id}`}
                                        state={{ name: genre.name }}
                                        onClick={onClose}
                                    >
                                        {genre.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;