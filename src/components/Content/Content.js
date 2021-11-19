import React, { useContext, useState, useEffect, useReducer } from 'react'
import './_content.scss'
import Card from './Card'
import { CountriesContext } from '../../Contexts/CountriesContext'
import InfiniteScroll from 'react-infinite-scroll-component';

let offset = { count: 0 } 

const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      default:
          return state
        //throw new Error();
    }
  } 

const Content = () => {
    const countries = useContext(CountriesContext)
    const [hasMore, setHasMore] = useState(true)
    const [items, setItems] = useState([])
    const limit = 10
    const [state, dispatch] = useReducer(reducer, offset)
    
    
    const fetchMoreData = () => {
  
       if(items.length === countries.allCountryData.length) {
           setHasMore(true)
       } 

        let newOffset = state.count * limit
        const nextCountries = countries.allCountryData.slice(newOffset, newOffset + limit)
        const newItems = items.concat(nextCountries)

            setTimeout(() => {
                dispatch({ type: 'increment' })
                setItems(newItems)
            },2000)
    
    }
console.log(items);
     
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
                
                    <InfiniteScroll
                        dataLength={items}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                            </p>}
                    >
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
                    </InfiniteScroll>
                    
                </div>
            </section> 
        )
    }
}   

export default Content