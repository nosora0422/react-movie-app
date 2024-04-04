import {useState, useEffect} from "react";
import Card from "../../components/Card/Card";
import './Search.css'
import PageIndi from "../../components/PageIndi/PageIndi";
import { useSearchContext } from '../../components/SearchContext/SearchContext';

export default function Search() {    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState(null);
    const [pageSize, setPageSize] = useState(1);
    const { searchTerm } = useSearchContext();
    const [favorites, setFavorites] = useState([]);
    
    const saveToLocal = (items) => {
        localStorage.setItem('react-movie-app', JSON.stringify(items));
    };


    //useEffect to run first mount and run again whenever pageSize updated.
    useEffect(() => {
        if (searchTerm) {
            const fetchUri = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=cdde34990a2da61ed1772fc6be340638&include_adult=false&language=en-US&page=${pageSize}`;
            fetchData(fetchUri);
        } 
    }, [searchTerm, pageSize]);


    //Funtion to fetch API data 
    const fetchData = (uri) => {
        fetch(uri)
        .then(res => res.json())
        .then(
            (result)=>{
                if (dataResult && dataResult.results) {
                    //If the current data is different than previous data, it add data from next page to current page. 
                    setDataResult((prevData) => ({results: [prevData.result, ...result.results]}));
                }else{
                    //All other case, display data on the first page.
                    setDataResult(result);
                }
                setIsLoaded(true);
            },
            (error)=>{
                setError(error);
                setIsLoaded(true);
            }
        )

    }

    useEffect(()=>{
        const favoriteMovies = JSON.parse(localStorage.getItem('react-movie-app'));
        if (favoriteMovies) {
            setFavorites(favoriteMovies);
        }
    },[]);
 
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

    const addFavoriteMovie = (movie) =>{
        const isSameItem = favorites.some((favorite) => favorite.id === movie.id)
        
        if (!isSameItem){
            const newFavoriteMovie = [...favorites, { ...movie, isAddedToList: true }];
            setFavorites(newFavoriteMovie);
            // console.log(newFavoriteMovie);
            saveToLocal(newFavoriteMovie);
            alert('The movie has been successfully added to your list!');
        } else {
           alert('The movie already exists in your list!'); 
        }
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
                <h1>Search</h1>
                {dataResult > 0 && dataResult !== null ? 
                    <Card 
                        data={dataResult} 
                        isLoaded={isLoaded} 
                        error={error}
                        handleFavorite={addFavoriteMovie}
                        removeFavourite={removeFavouriteMovie}
                        isFavoritesData={false}
                    /> :
                    <p className="message">No movie was found.</p>
                }
                <PageIndi handlerButton={handlerButton} />
        </div>
    );
}