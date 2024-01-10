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
        
    return (
        <div className="content">
            {dataResult && <Card data={dataResult} isLoaded={isLoaded} error={error}/>}
            <PageIndi handlerButton={handlerButton} />
        </div>
    );
}