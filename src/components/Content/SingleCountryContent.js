import React from 'react'
import Card from './Card'
import './_single-country-content.scss'

const SingleCountryContent = (props) => {
    
    return (
        <div className="countries">
            {props.items.map((country, i) => {
                return(
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
    )

}

export default SingleCountryContent;