import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CountriesContext } from '../../Contexts/CountriesContext'
import './_singleCountryPage.scss'
import { ThemeContext } from '../../Contexts/ThemeContext'


const SingleCountryPage = () => {
    const {allCountryData} = useContext(CountriesContext)
    const themes = useContext(ThemeContext)
    const countryName = useParams().name
    const [singleCountry, setSingleCountry] = useState([]);
    const [borderCountries, setBorderCountries] = useState([])
    const history = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v2/name/${countryName}`)
                const responseData = await response.json()

                if(!response.ok) {
                  throw new Error(responseData.message)
                }
                setSingleCountry(responseData[0])
                setBorderCountries(responseData[0].borders)
                
              } catch (error) {}                 
        }
        fetchData()

    }, [allCountryData, countryName])

    const getBorderCountryName = (countries, code) => {
        const matchingCountry = countries.find(country => {
          return country.alpha3Code === code;
        })
        return matchingCountry || [];
    }

    return (
        <section className="single-country">
            <button type="button" className="secondary" onClick={() => history(-1)}>
                Back
            </button>
        <div className="single-country-container" style={themes.themeStyleElements} >
            <img src={singleCountry.flag} alt="country-flag"/>
            
            <div className="country-details">
                <h2>
                    {singleCountry.name}
                </h2>
                <p>
                    <strong>Native Name: </strong>
                    {singleCountry.nativeName}
                </p>
                <p>
                    <strong>Population: </strong>
                    {singleCountry.population}
                </p>
                <p>
                    <strong>Region: </strong>
                    {singleCountry.region}
                </p>
                <p>
                    <strong>Subregion: </strong>
                    {singleCountry.subregion}
                </p>
                <p>
                    <strong>Capital: </strong>
                    {singleCountry.capital}
                </p>
                <p>
                    <strong>Top Level Domain: </strong>
                    {singleCountry.subregion}
                </p>
                
                <p>
                    <strong>Languages: </strong>
                    {singleCountry.subregion}
                </p>
                <div className="border-countries">
                    <p>
                        <strong>Border countries: </strong>
                    </p>
                    
                    {borderCountries ? borderCountries.map((country, i) => {
                        const filteredCountry = getBorderCountryName(allCountryData, country)
                        return (
                            <button className="secondary" type="button" key={i} onClick={() => window.location = `/${filteredCountry.name}`}>
                                {filteredCountry.name}
                            </button>
                        )
                    }) : "No border countries"}
                </div>
            </div>
        </div>
        </section>
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