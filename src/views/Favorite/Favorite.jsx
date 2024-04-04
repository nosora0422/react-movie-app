import './Favorite.css';
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LineShareButton,
    LineIcon,
    InstapaperShareButton,
    InstapaperIcon,
    EmailShareButton,
    EmailIcon

    
  } from "react-share";

import Card from "../../components/Card/Card";

export default function Favorite() {    
    const [favorites, setFavorites] = useState([]);
    const [isBoxOpen, isSetBoxOpen] = useState(false);
    const shareUrl = "https://nosora0422.github.io/react-movie-app/#/";
    const socialMediaIcons = [
        {
            shareButton: FacebookShareButton,
            icon: FacebookIcon,
            title: 'TMDB My Favorite List',
            hashtag: '#Sora-Noh'
        },
        {
            shareButton: WhatsappShareButton,
            icon: WhatsappIcon,
            title: 'TMDB My Favorite List',
            hashtag: '#Sora-Noh'
        },
        {
            shareButton: LineShareButton,
            icon: LineIcon,
            title: 'TMDB My Favorite List',
            hashtag: '#Sora-Noh'
        },
        {
            shareButton: TwitterShareButton,
            icon: TwitterIcon,
            title: 'TMDB My Favorite List',
            hashtag: '#Sora-Noh'
        },
        {
            shareButton: InstapaperShareButton,
            icon: InstapaperIcon,
            title: 'TMDB My Favorite List',
            hashtag: '#Sora-Noh'
        },
        {
            shareButton: EmailShareButton,
            icon: EmailIcon,
            title: 'TMDB My Favorite List',
            hashtag: '#Sora-Noh'
        },
    ];

    //Get array from Local storage parse to JS object
    useEffect(()=>{
        const favoriteMovies = JSON.parse(localStorage.getItem('react-movie-app'));
        setFavorites(favoriteMovies);
        
    },[]);
    
    const boxhandler = () => (
        isSetBoxOpen(prev => !prev)
    );

    //add favorite list items in Local storage
    const saveToLocal = (items) => {
        localStorage.setItem('react-movie-app', JSON.stringify(items));
    };

    //add to favotrite list 
    const addFavoriteMovie = (movie) =>{
        const newFavoriteMovie = [...favorites, { ...movie, isAddedToList: true }];
        setFavorites(newFavoriteMovie);
        saveToLocal(newFavoriteMovie);
        // console.log(newFavoriteMovie);
    }

    //remove from favotrite list by filtering items that have different movie id than the selected item.
    const removeFavouriteMovie = (movie) =>{
        const newFavoriteMovie = favorites.filter((favorite)=>favorite.id !== movie.id);
        setFavorites(newFavoriteMovie);
        saveToLocal(newFavoriteMovie);
        // console.log(newFavoriteMovie);
    };

    
    return (
        <div className="content">
            <div className="fav-heading-box">
                <h1>My Favorite</h1>
                <div className="share-box">
                    <button 
                        className="add-btn" 
                        onClick={boxhandler}
                    >
                        <FontAwesomeIcon icon={faShareFromSquare} style={{paddingRight: '8px'}}/>
                        Share
                    </button>
                    <ul className="social-media-box">
                        {isBoxOpen && socialMediaIcons.map((iconData, index) => (
                            <motion.li 
                                className="social-media-icon" 
                                key={index}
                                initial={{opacity:0, translateX:10}}
                                animate={{opacity:1, translateX:0}}
                                transition={{duration:0.5, delay:index * 0.05}}
                            >
                                <iconData.shareButton
                                    url={shareUrl}
                                    title={iconData.title}
                                    hashtag={iconData.hashtag}
                                >
                                    <iconData.icon size={32} round={true} />
                                </iconData.shareButton>
                            </motion.li>
                        ))}
                    </ul>
                    
                </div>
            </div>
            <div>
                {favorites !== null && favorites.length > 0 ? 
                    <Card
                        data={favorites} 
                        handleFavorite={addFavoriteMovie}
                        removeFavourite={removeFavouriteMovie}
                        isFavoritesData={true}
                    /> : <p className="message">No movie has been added.</p>
                } 
            </div>
        </div>
    );
}