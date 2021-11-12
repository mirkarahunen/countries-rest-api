import React, { useContext } from 'react'
import './_content.scss'
import Card from './Card'
import { CountriesContext } from '../../Contexts/CountriesContext'

const Content = () => {
    const countries = useContext(CountriesContext)
    
    if(countries.filteredCountries.length) {
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
                        {countries.allCountryData.map((country, i) => {
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
    }
}   

export default Content