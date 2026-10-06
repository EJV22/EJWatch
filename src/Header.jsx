import { useContext, useState } from "react";
import { ApiContext } from "./Context";

function Header () {

    const { search } = useContext(ApiContext);

    const [searchTerm, setSearchTerm] = useState('');

    const [barHidden, setBarHidden] = useState(true);

    const handleSearch = () => {
    if (searchTerm.trim()) {
        search(searchTerm);}
    };

    return(
        <header className="header">

            <a href="/catalog"
                onClick={ (e) => {
                    e.preventDefault();

                    search(searchTerm)}}>
                <h1>EJWatch</h1>
            </a>

            <div className="header-btns">

                <a href="/catalog"
                    onClick={(e) => {
                        e.preventDefault();

                        search("")}}>
                    Home</a>

                <a href="/movies"
                    onClick = { (e) => {
                        e.preventDefault();

                        search(null, "movie");}}>
                    Movies</a>

                <a href="/tv-shows"
                    onClick = { (e) => {                        
                        e.preventDefault();

                        search(null, "tv");}}>
                    TV Shows</a>

                <div className="search">
                    
                    <i className="fa-solid fa-magnifying-glass"
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            if (barHidden || !searchTerm.trim()) {
                                setBarHidden(false);
                            } else {
                                handleSearch();}
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                if (barHidden || !searchTerm.trim()){
                                    setBarHidden(false);
                                }else {handleSearch();}}
                            }
                        }>    
                    </i>
                    
                    <input className={barHidden ? `hidden` : `shown`}
                        placeholder="Search for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleSearch();}}/>
                </div>

                <div className="user">
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>

        </header>
    );
    
}

export default Header
