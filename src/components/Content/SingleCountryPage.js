import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CountriesContext } from '../../Contexts/CountriesContext'
import { ThemeContext } from '../../Contexts/ThemeContext'

const SingleCountryPage = () => {
    const {singleCountry} = useContext(CountriesContext)
    const themes = useContext(ThemeContext)
    const country = useParams().name


const data = singleCountry[0]
console.log(country);



    return (
        <div className="card" style={themes.themeStyleElements} >
            <img  alt="country-flag"/>
            <h2>{data.name}</h2>
            {/*<div className="country-details">
                <span><strong>Native Name: </strong>{data.nativeName}</span>
                <span><strong>Population: </strong>{data.population}</span>
                <span><strong>Region: </strong>{data.region}</span>
                <span><strong>Subregion: </strong>{data.subregion}</span>
                <span><strong>Capital: </strong>{data.capital}</span>
                <span><strong>Top Level Domain: </strong>{data.subregion}</span>
                <span><strong>Currencies: </strong>{Object.values(data.languages)}</span>
                <span><strong>Languages: </strong>{data.subregion}</span>
    </div>*/}
      
        </div>
    )

}

export default SingleCountryPage
/*
import './_single-country-content.scss'
import InfiniteScroll from 'react-infinite-scroll-component';

const SingleCountryContent = (props) => {
    const [hasMore, setHasMore] = useState(true)
    //const [items, setItems] = useState([])
    

    useEffect(() => {
        setItems(props.items.slice(0,8))
    }, [props.items])
   

    const fetchMoreData = () => {
        if (props.items.length > 250) setHasMore(false)

        //console.log(items.length, ...items + props.items.slice(0,8));
        //setItems(...items, props.items.slice(0,8))
        
        //setItems(items.concat(props.items))
        
    }



    return (
        
            <InfiniteScroll
                dataLength={props.items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                
            </InfiniteScroll>
        
    )

}

export default SingleCountryContent;
*/