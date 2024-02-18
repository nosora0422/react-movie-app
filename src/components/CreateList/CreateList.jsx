import './CreateList.css';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



export default function CreateList() { 
    const [listName, setListName] = useState('');
    const createHandle = (event) =>{
        setListName(event.target.value)
    }
    return(
        <div className="create-list-box">
            <input
                className="create-list-input"
                placeholder="Create New List"
                type="text"
                value={listName}
                onChange={createHandle}
            />
            <button className="add-btn">
                <FontAwesomeIcon icon={faPlus} style={{paddingRight: '8px'}}/>
                Create List
            </button>
        </div>
    )
}