import React from "react";
import './Pills.css';
import { Link, useLocation } from "react-router-dom";

export default function Pills(){
    const cRoute = useLocation();

    return(
        <div className="pills">
            <ul>
                <li><Link to="/" className={(cRoute.pathname === '/' || cRoute.pathname === '/now-playing') ? 'pill-link-curr' : 'pill-link'}>Now Playing</Link></li>
                <li><Link to="/tranding" className={(cRoute.pathname === '/tranding') ? 'pill-link-curr' : 'pill-link'}>Tranding</Link></li>
                <li><Link to="/top-rated" className={(cRoute.pathname === '/top-rated') ? 'pill-link-curr' : 'pill-link'}>Top Rated</Link></li>
                <li><Link to="/upcoming" className={(cRoute.pathname === '/upcoming') ? 'pill-link-curr' : 'pill-link'}>Upcoming</Link></li>
            </ul>
        </div>
    )
}