import React, { useContext, useState, useEffect, useReducer } from 'react'
import './_content.scss'
import Card from './Card'
import { CountriesContext } from '../../Contexts/CountriesContext'
//import InfiniteScroll from 'react-infinite-scroll-component';

let offset = { count: 0 } 

const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      default:
          return state
        //throw new Error();
    }
  } 

const Content = () => {
    const countries = useContext(CountriesContext)
    const [hasMore, setHasMore] = useState(true)
    const [items, setItems] = useState([])
    const limit = 50
    const [state, dispatch] = useReducer(reducer, offset)
    const fullLength = countries.allCountryData.length + limit
    const [loader, setLoader] = useState(false)

    const fetchMoreData = () => {
        
        let newOffset = state.count * limit
        const nextCountries = countries.allCountryData.slice(newOffset, newOffset + limit)
        const newItems = items.concat(nextCountries)
        setLoader(true)

        setTimeout(() => {
            dispatch({ type: 'increment' })
            setItems(newItems)
            setLoader(false)
        }, 5000)

            if(items.length === fullLength) {
                setHasMore(false)
                setLoader(false)
            } 
            
    }
     
    useEffect(() => {
        const list = () => {
            setItems(countries.allCountryData.splice(0, limit))
      }
      list()

    }, [countries.allCountryData])
    

    if(countries.filteredCountries.length > 0) {
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
                                />
                            )
                        })}
                    </div>
                </div>
            </section> 
        )

    } else {
        return (
            <section className="countries-content">
                <div className="container">
                    <div className="countries">
                        {items.map((country, i) => {
                            return (
                                <Card 
                                    name={country.name}
                                    key={i}
                                    capital={country.capital}
                                    region={country.region}
                                    population={country.population}
                                    flag={country.flag}
                            />
                            )
                        })}
                    </div>
                    <div className="more">
                        <button type="button" className="more primary" onClick={fetchMoreData}>
                            Load more
                        </button>
                        {loader &&
                            <h4 style={{ textAlign: "center" }}>Loading...</h4>
                        }
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