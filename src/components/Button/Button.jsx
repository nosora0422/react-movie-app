import './Button.css';

export default function Button(props){
    return(
        <>
            <a className="button" target="new" href={props.path}>Watch Now</a>
        </>
    )
}