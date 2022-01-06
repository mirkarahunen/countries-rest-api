import React, { useContext, useState, useEffect } from 'react'
import './_content.scss'
import Card from './Card'
import { CountriesContext } from '../../Contexts/CountriesContext'
//import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import Loading from '../LoadingSpinner/Loading'


const Content = () => {
    const countries = useContext(CountriesContext)
    const [hasMore, setHasMore] = useState(true)
    const limit = 12

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
    const [filteredOffset, setFilteredOffset] = useState(() => {
        return startOffset ? parseInt(startOffset) : count
    })
    const fullLength = countries.allCountryData.length
    const fullLengthFiltered = countries.filteredCountries.length
    const [loader, setLoader] = useState(false)
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    // Fetching more data for all countries
    const fetchMoreData = () => {
        sessionStorage.setItem("scroll", window.pageYOffset)
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
        }, 1000)

        if(items.length === fullLength) {
            setHasMore(false)
            setLoader(false)
        }       
    }

    // Fetching more data for filtered countries
    const fetchMoreFilteredData = () => {
        sessionStorage.setItem("scroll", window.pageYOffset)
        const offsetToNumber = parseInt(filteredOffset) + 1
        setFilteredOffset(offsetToNumber)

        let newOffset = offsetToNumber * limit
        
        const nextCountries = countries.filteredCountries.slice(newOffset, newOffset + limit)
        const newItems = filteredItems.concat(nextCountries)
        
        setLoader(true)

        setTimeout(() => {
            setFilteredItems(newItems)
            setLoader(false)
            sessionStorage.setItem("filtered", JSON.stringify(newItems))
        }, 1000)

        if(filteredItems.length === fullLengthFiltered) {
            setHasMore(false)
            setLoader(false)
        }       
    }

    useEffect(() => {
        let scroll = sessionStorage.getItem("scroll")
        
        window.scrollTo(0, scroll)

    })
    

    useEffect(() => {
        sessionStorage.setItem("counter", JSON.stringify(offset))
        setItems(getStorage("countries"))

        if(countries.filteredCountries) {
            setFilteredItems(getStorage("filtered"))
        }

        
    }, [offset, countries.allCountryData, countries.filteredCountries])

    useEffect(() => {
        window.onunload = () => {
            sessionStorage.removeItem("counter")
        }
        //if(sessionStorage.getItem("counter") === "0") window.scrollTo(0,0)
            
    },[])


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
                        {filteredItems && filteredItems.map((country, i) => {
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
                            <button type="button" className="more primary" onClick={fetchMoreFilteredData}>
                                Load more
                            </button> 
                        : 
                            <Loading/>}
                        {!hasMore && <h4 style={{ textAlign: "center" }}>
                            Yay! You've seen it all
                        </h4>}                
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
                                <span className='line-1'></span>
                                <span className='line-2'></span>
                                <span className='line-3'></span>
                                <span className='line-4'></span>
                            </button> 
                        : 
                            <Loading/>}
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