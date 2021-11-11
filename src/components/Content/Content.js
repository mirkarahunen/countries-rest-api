import React from 'react'
import './_content.scss'
import Card from './Card'

const Content = (props) => {

   
    return (
        <section className="countries-content">
            <div className="container">
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
                                style={props.style}
                            />
                        )
                    })}
                    
                </div>
            </div>
        </section>
        
    )
}

export default Content