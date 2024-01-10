import React from "react";
import './Nav.css';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav(){
    const iconStyle = { marginRight: '20px'};
    const cRoute = useLocation();

    return(
        <nav>
            <ul>
                <li><Link to="/now-playing" className={(cRoute.pathname === '/now-playing') ? 'nav-item-curr' : 'nav-item'}><FontAwesomeIcon icon={faHouse} style={iconStyle}/>Home</Link></li>
                <li><Link to="/favorite" className={(cRoute.pathname === '/favorite') ? 'nav-item-curr' : 'nav-item'}><FontAwesomeIcon icon={faList} style={iconStyle}/>My Favorite</Link></li>
                <li><a className="nav-item" href="#"><FontAwesomeIcon icon={faUser} style={iconStyle}/>My Account</a></li>
            </ul>
        </nav>
    )
}