import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './header.css';
import { useSearchContext } from '../../components/SearchContext/SearchContext';

export default function Header(){
    const cRoute = useLocation();
    const { setSearchTerm } = useSearchContext();
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    return(
        <div className="search-bar">
            <a className="logo" href="#"></a>
            <input type="text" id="search" required minLength="4" placeholder="Search movies" onChange={handleChange}/>
            <Link to="/search" className={(cRoute.pathname === '/search') ? 'search-button' : 'search-button'} onClick={handleSearch}>Search</Link>
        </div>

    )
}