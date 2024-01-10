import './Card.css';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import AddToList from '../AddToList/AddToList';

export default function Card({ data, isLoaded, error, handleFavorite, removeFavourite, isFavoritesData }){
    //checks if the data is from local storage
    if (isFavoritesData) {
        // console.log(data);
        return (
            <div className="container">
                <h1>My Favorite</h1>
                <div className="card-container">
                    {data.map((item, index) => addMoiveCard(item, index))}
                </div>
            </div>
        );
    }
    else if (!isLoaded) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    else if (error) {
        // error is an object so if we wanted to we could extract the message from it
        return (
            <div>
                There was an error loading your data.
            </div>
        );
    }
    else if (data.results === null) {
        // check Postman with an invalid cuisine you'll see it returns meals as null
        return (
            <div>
                No movies match your request.
            </div>
        );
    }
    else {
        
        return (
            <div className="container">
                <div className="card-container">
                    {data.results.map(addMoiveCard)}
                </div>
            </div>
        );
    }


    function addMoiveCard(item, index){
        if (!item) {
            return null; // Return null if item is undefined or null
        }
        return(
            <div key={`${item.id}-${index}`}  className="card-item">
                <div className='top-box'>
                    <p className="vote-range">★{Math.round(item.vote_average)}</p>
                    <AddToList 
                    handleAdd={() => handleFavorite(item)}
                    handleRemove={() => removeFavourite(item)}
                    isFavorite={item.isAddedToList} // Initial state set to not added to the cart yet which is non-filled heart icon.
                    />
                </div>
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img" alt="Movie Posters"/>
                <div className="info">
                    <div className="title">
                        <h2 className="name">{item.title}</h2>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </div>
                    <div className="discription">
                        <p className="release">{item.release_date}</p>
                        <p className="overview">{item.overview}</p>
                    </div>
                    <Button path={`https://www.themoviedb.org/movie/${item.id}/watch`} />
                </div>
            </div>
        )
    };
}

    
