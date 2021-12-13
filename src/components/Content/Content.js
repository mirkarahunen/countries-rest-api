import React, { useContext, useState, useEffect, useRef, useLayoutEffect } from 'react'
import './_content.scss'
import Card from './Card'
import { CountriesContext } from '../../Contexts/CountriesContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'


const Content = () => {
    const countries = useContext(CountriesContext)
    const [hasMore, setHasMore] = useState(true)
    const limit = 12
    const [scrollPosition, setScrollPosition] = useState(0);

    const getStorage = (key, value) => {
        let storedCountries = sessionStorage.getItem(key)
        
        if(!storedCountries) {
            return value
        } else {
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
    const position = useRef(window.pageYOffset);

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
        }, 500)

        if(items.length === fullLength) {
            setHasMore(false)
            setLoader(false)
        }       
    }

    window.addEventListener('scroll', () => {
        setScrollPosition(window.pageYOffset)
    })
    
        
        //setScrollPosition(position);
    useLayoutEffect(() => {
        position.current = scrollPosition
    }, [scrollPosition])
    

    useEffect(() => {
        sessionStorage.setItem("counter", JSON.stringify(offset))
        setItems(getStorage("countries"))
    }, [offset, countries.allCountryData])

    useEffect(() => {
        window.pageYOffset = position.current
        window.onunload = () => {
            sessionStorage.removeItem("counter")
        }
        if(sessionStorage.getItem("counter") === "0") window.scrollTo(0,0)
            
    },[items])


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

    else if(countries.filteredCountries.length > 0) {
        return (
            <section className="countries-content">
                <div className="container">
                    <div className="countries">
                        {countries.filteredCountries.map((country, i) => {
                            
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