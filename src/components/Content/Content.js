import React, { useContext, useState, useEffect } from 'react'
import './_content.scss'
import Card from './Card'
import { CountriesContext } from '../../Contexts/CountriesContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'


const Content = () => {
    const countries = useContext(CountriesContext)
    const [hasMore, setHasMore] = useState(true)
    const limit = 12

    const getStorage = (key, value) => {
        let storedCountries = sessionStorage.getItem(key)
        
        if(!storedCountries) {
            //console.log(value);
            return value
        } else {
            //console.log(storedCountries);
            //sessionStorage.setItem("countries", JSON.stringify(storedCountries))
            return JSON.parse(storedCountries)
        }
    }

    let count = 0
    let startOffset = sessionStorage.getItem("counter")
    const [offset, setOffset] = useState(() => {
        return startOffset ? parseInt(startOffset) : count
    })

    const fullLength = countries.allCountryData.length
    const [loader, setLoader] = useState(false)
   
    const [items, setItems] = useState([])



    const fetchMoreData = () => {
        const offsetToNumber = parseInt(offset) + 1
        setOffset(offsetToNumber)

        let newOffset = offsetToNumber * limit

        const nextCountries = countries.allCountryData.slice(newOffset, newOffset + limit)
        const newItems = items.concat(nextCountries)
        
        setLoader(true)

        setTimeout(() => {
            setItems(newItems)
            setLoader(false)
            sessionStorage.setItem("countries", JSON.stringify(newItems))
        }, 2000)

        if(items.length === fullLength) {
            setHasMore(false)
            setLoader(false)
        }       
    }

    useEffect(() => {
        sessionStorage.setItem("counter", JSON.stringify(offset))
        setItems(getStorage("countries"))
        
        //if(window.location.reload) 
        //if(window.history.state.idx > 1) return sessionStorage.removeItem("counter")
      

    }, [offset, countries.allCountryData])


    if(countries.searchedCountries.length > 0) {
        return (
            <section className="countries-content">
                <div className="container">
                    <div className="countries">
                        {countries.searchedCountries.map((country, i) => {
                            
                            return (
                                <Card 
                                    name={country.name}
                                    key={i}
                                    capital={country.capital}
                                    region={country.region}
                                    population={country.population}
                                    flag={country.flag}
                                    numericCode={country.numericCode}
                                />
                            )
                        })}
                    </div>
                </div>
            </section> 
        )
    } 

    else if(countries.noMatches) {
        return (
            <section className="countries-content">
                <div className="container">
                    <div className="countries centered">
                        <h2>Sorry, no matches found!</h2>
                    </div>
                </div>
            </section> 
        )
    }
    
    else {
        return (
            <section className="countries-content">
                <div className="container">
                    <div className="countries">
                        {items && items.map((country, i) => {
                            return (
                                <Card 
                                    name={country.name}
                                    key={i}
                                    capital={country.capital}
                                    region={country.region}
                                    population={country.population}
                                    flag={country.flag}
                                    numericCode={country.numericCode}
                            />
                            )
                        })}
                    </div>
                    <div className="more"> 
                        {!loader ? 
                            <button type="button" className="more primary" onClick={fetchMoreData}>
                                Load more
                            </button> 
                        : 
                            <LoadingSpinner/>}
                        {!hasMore && <h4 style={{ textAlign: "center" }}>
                            Yay! You've seen it all
                        </h4>}                
                    </div>    
                </div>
            </section> 
        )
    }
}   

export default Content