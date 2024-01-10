import './Favorite.css';
import {useState, useEffect} from "react";
import Card from "../../components/Card/Card";
import PageIndi from "../../components/PageIndi/PageIndi";


export default function Favorite() {    
    const [pageSize, setPageSize] = useState(1);
    const [favorites, setFavorites] = useState([]);

    //Get array from Local storage parse to JS object
    useEffect(()=>{
        const favoriteMovies = JSON.parse(localStorage.getItem('react-movie-app'));
       
        setFavorites(favoriteMovies);
        
    },[]);
    

    //Function to add favorite list items in Local storage
    const saveToLocal = (items) => {
        localStorage.setItem('react-movie-app', JSON.stringify(items));
    };

    //Funtion to load previous page and next page
    const handlerButton = (action) => {
        if(action === 'previous') {
            if(pageSize !== 1){
                setPageSize(prevPage => prevPage - 1);
            }else{
                setPageSize(1);
            }
        } else if(action === 'next') {
            setPageSize(prevPage => prevPage + 1);
        }
    }
    //Function to add to favotrite list 
    const addFavoriteMovie = (movie) =>{
        const newFavoriteMovie = [...favorites, { ...movie, isAddedToList: true }];
        setFavorites(newFavoriteMovie);
        saveToLocal(newFavoriteMovie);
        // console.log(newFavoriteMovie);
    }

    //Function to remove from favotrite list by filtering items that have different movie id than the selected item.
    const removeFavouriteMovie = (movie) =>{
        const newFavoriteMovie = favorites.filter((favorite)=>favorite.id !== movie.id);
        setFavorites(newFavoriteMovie);
        saveToLocal(newFavoriteMovie);
        // console.log(newFavoriteMovie);
    };
    

    return (
        <div className="content">
            {<Card 
                data={favorites} 
                handleFavorite={addFavoriteMovie}
                removeFavourite={removeFavouriteMovie}
                isFavoritesData={true}
            />
            }
            <PageIndi handlerButton={handlerButton} />
        </div>
    );
}