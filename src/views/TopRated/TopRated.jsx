import {useState, useEffect} from "react";
import Card from "../../components/Card/Card";
import PageIndi from "../../components/PageIndi/PageIndi";
import Pills from "../../components/Pills/Pills";

export default function TopRated() {    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState(null);
    const [pageSize, setPageSize] = useState(1);
    const fetchUri = `https://api.themoviedb.org/3/movie/top_rated?api_key=cdde34990a2da61ed1772fc6be340638&language=en-US&page=${pageSize}`;
    
    //useEffect to run first mount and run again whenever pageSize updated.
    useEffect(() => {
        fetchData(fetchUri);
    },[fetchUri]);


    //Funtion to fetch API data 
    const fetchData = (url) => {
        fetch(url)
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
            <Pills />
            <h1>Top Rated</h1>
            <Card 
                data={dataResult} 
                isLoaded={isLoaded} 
                error={error}
            />
            <PageIndi handlerButton={handlerButton} />
        </div>
    );
}