import React, { useState } from 'react';
import './AddToList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function AddToList({ handleAdd, handleRemove, isFavorite }) {
    const [isAddedToList, setIsAddedToList] = useState(isFavorite);
    const [heartColor, setHeartColor] = useState('#F8F8F8');
    
    const handleClick = () => {
        // isFavorit = false, toggles to add and remove items from the favorite list 
        setIsAddedToList(prevState => !prevState);

        // Depending on the current state, execute the corresponding function
        if (isAddedToList) {
            handleRemove(); // Remove from favorites
        } else {
            handleAdd(); // Add to favorites
        }
    };

    const regularHeartStyle = {
        color: heartColor,
    };
    return (
        <div onClick={handleClick}>
            <FontAwesomeIcon
                className="heart-icon"
                icon={isAddedToList ? solidHeart : regularHeart}
                style={regularHeartStyle}
            />
        </div>
    );
}