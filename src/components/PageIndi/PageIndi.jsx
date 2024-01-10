import './PageIndi.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
export default function PageIndi({handlerButton}){
    const handler = (action) => {
        handlerButton(action);
    };

    return(
        <div className="button-box">
            <div className="load-more-button" onClick={() => handler('previous')}><FontAwesomeIcon icon={faChevronLeft} /></div>
            <div className="load-more-button" onClick={() => handler('next')}><FontAwesomeIcon icon={faChevronRight} /></div>
        </div>
    )
}