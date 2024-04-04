import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './header.css';
import { useSearchContext } from '../../components/SearchContext/SearchContext';
import tmdbLogo from '../../assets/icons/tmdb-logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Header(){
    const cRoute = useLocation();
    const { setSearchTerm } = useSearchContext();
    const [searchInput, setSearchInput] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleIcon = () => {
        setIsSearchOpen(prev => !prev);
    }

    return(
        <div className="search-bar">
            <div className="logo-box">
                <Link to='/'>
                    <img className="logo" src={tmdbLogo} alt="tmdb-logo"/>
                </Link>
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    size="xl"
                    className="search-icon"
                    onClick={handleIcon} 
                />
            </div>
            <div className="mobile-search">
                <div className={isSearchOpen ? "search-input" : "search-input-closed"}>
                    <input 
                        type="text" 
                        id="search" 
                        required 
                        minLength="4" 
                        placeholder="Search movies" 
                        onChange={handleChange}
                    />
                    <Link 
                        to="/search" 
                        className={(cRoute.pathname === '/search') ? 'search-button' : 'search-button'} 
                        onClick={handleSearch}
                        >
                            Search
                    </Link>
                </div>
            </div>
            <div className="desktop-search">
                <div className="search-input">
                    <input 
                        type="text" 
                        id="search" 
                        required 
                        minLength="4" 
                        placeholder="Search movies" 
                        onChange={handleChange}
                    />
                    <Link 
                        to="/search" 
                        className={(cRoute.pathname === '/search') ? 'search-button' : 'search-button'} 
                        onClick={handleSearch}
                        >
                            Search
                    </Link>
                </div>
            </div>
        </div>

    )
}