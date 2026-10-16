import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GenresDropdown from "./GenresDropdown.jsx";
import Sidebar from "./Sidebar.jsx";

function Header() {
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoClicked, setLogoClicked] = useState(false);
    const [term, setTerm] = useState("");
    const inputRef = useRef(null);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    useEffect(() => {
        if (searchOpen) inputRef.current?.focus();
    }, [searchOpen]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setSearchOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 687px)");
        const onChange = (e) => {
            if (e.matches) setMenuOpen(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const submitSearch = (e) => {
        e.preventDefault();
        const q = term.trim();
        if (!q) return;
        navigate(`/search?q=${encodeURIComponent(q)}`);
        setSearchOpen(false);
        setTerm("");
    };

    return (
        <>
            <header className="header">

                <Link to="/" className="logo" onClick={() => setLogoClicked(true)}>
                    <i
                        className={`fa-solid fa-clapperboard${logoClicked ? " logo-clap" : ""}`}
                        onAnimationEnd={() => setLogoClicked(false)}
                        aria-hidden="true"
                    ></i>
                    <h1>EJWatch</h1>
                </Link>

                <nav className="navbar">

                    <div className="selection">
                        <Link to="/" className="home-btn">Home</Link>
                        <Link to="/movie" className="movies-btn">Movies</Link>
                        <Link to="/tv" className="tv-shows-btn">TV Shows</Link>

                        <GenresDropdown />

                        <button
                            type="button"
                            className="menu-btn"
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            aria-controls="sidebar"
                            onClick={() => setMenuOpen(true)}
                        >
                            <i className="fa-solid fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div className="search-profile">
                        <button
                            type="button"
                            className="search-icon"
                            aria-label="Search"
                            aria-expanded={searchOpen}
                            onClick={() => setSearchOpen((o) => !o)}
                        >
                            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                        </button>

                        <Link to="/" className="profile-icon" aria-label="Profile">
                            <i className="fa-solid fa-user" aria-hidden="true"></i>
                        </Link>
                    </div>

                </nav>

                {searchOpen && (
                    <form className="search-box" onSubmit={submitSearch} role="search">
                        <input
                            ref={inputRef}
                            type="search"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="Search movies and TV shows..."
                            aria-label="Search movies and TV shows"
                        />
                        <button type="submit">Search</button>
                    </form>
                )}

            </header>

            <Sidebar open={menuOpen} onClose={closeMenu} />
        </>
    );
}

export default Header;