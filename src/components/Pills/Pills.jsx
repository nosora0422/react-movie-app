import React from "react";
import { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import './Pills.css';

export default function Pills(){
    const [isCateOpen, setIsCateOpen] = useState('false');
    const cRoute = useLocation();

    const categoryHandler = () => {
        setIsCateOpen(prev => !prev);
    }

    const menuItems = [
        { 
            path: "/", 
            text: "Now Playing" 
        },
        { 
            path: "/tranding", 
            text: "Trending" 
        },
        { 
            path: "/top-rated", 
            text: "Top Rated" 
        },
        { 
            path: "/upcoming", 
            text: "Upcoming" 
        }
      ];

    return(
        <div className="pills">
            <ul className="desktop-pills">
                <li><Link to="/" className={(cRoute.pathname === '/' || cRoute.pathname === '/now-playing') ? 'pill-link-curr' : 'pill-link'}>Now Playing</Link></li>
                <li><Link to="/tranding" className={(cRoute.pathname === '/tranding') ? 'pill-link-curr' : 'pill-link'}>Tranding</Link></li>
                <li><Link to="/top-rated" className={(cRoute.pathname === '/top-rated') ? 'pill-link-curr' : 'pill-link'}>Top Rated</Link></li>
                <li><Link to="/upcoming" className={(cRoute.pathname === '/upcoming') ? 'pill-link-curr' : 'pill-link'}>Upcoming</Link></li>
            </ul>
            <div className="mobile-pills">
                <div className="m-pills-box">
                    <div onClick={categoryHandler}>
                        <p className="category">Category
                        <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: 10}}/>
                        </p>
                    </div>
                    <ul className={isCateOpen ? "mobile-pills-closed" : "mobile-pills-open"} >
                        {menuItems.map((menuItem, index) => (
                            <motion.li 
                                key={index}
                                initial={{opacity:0, translateY:20}}
                                animate={{opacity:1, translateY:0}}
                                transition={{duration:0.3, delay:index * 0.2}}
                            >
                                <Link
                                    to={menuItem.path}
                                    className={cRoute.pathname === menuItem.path ? 'm-pill-link-curr' : 'm-pill-link'}
                                >
                                    {menuItem.text}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div> 
                
            </div>
            
        </div>
    )
}