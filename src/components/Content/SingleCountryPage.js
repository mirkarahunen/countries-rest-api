import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CountriesContext } from '../../Contexts/CountriesContext'
import './_singleCountryPage.scss'


const SingleCountryPage = () => {
    const {allCountryData} = useContext(CountriesContext)
    const countryName = useParams().name
    const [singleCountry, setSingleCountry] = useState([]);
    const [borderCountries, setBorderCountries] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0,0)

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
            <div className="single-country-container">
                <div className="back-button-container">
                    <button type="button" className="back primary" onClick={() => window.history.back(-1)}>
                        <i className="fas fa-arrow-left"></i>
                        Back
                    </button>
                </div>
                
                <div className="img-container">
                    <img src={singleCountry.flag} alt="country-flag"/>
                </div>
            
                <div className="country-details">            
                    <h1>
                        {singleCountry.name}
                    </h1>
                    <div className="country-details-wrapper">
                        <div className="main-info">
                            <p>
                                <strong>Native Name: </strong>
                                {singleCountry.nativeName ? singleCountry.nativeName : "No Native Name Given"}
                            </p>
                            <p>
                                <strong>Population: </strong>
                                {singleCountry.population ? singleCountry.population : "No Population Given"}
                            </p>
                            <p>
                                <strong>Region: </strong>
                                {singleCountry.region ? singleCountry.region : "No Region Given"}
                            </p>
                            <p>
                                <strong>Sub Region: </strong>
                                {singleCountry.subregion ? singleCountry.subregion : "No Sub Region Given"}
                            </p>
                            <p>
                                <strong>Capital: </strong>
                                {singleCountry.capital ? singleCountry.capital : "No Capital"}
                            </p>
                        </div>
                        <div className="extra-info">
                            <p>
                                <strong>Top Level Domain: </strong>
                                {singleCountry.topLevelDomain && singleCountry.topLevelDomain.map((item, i) => {
                                    return (
                                        <span key={i}>
                                            {item ? item : "No Top Level Domain Given"}
                                        </span>
                                    )
                                })}
                            </p>
                            <p>
                                <strong>Currencies: </strong>
                                {singleCountry.currencies && singleCountry.currencies.map((item, i) => {
                                    return (
                                        <span key={i}>
                                            {item.name ? item.name : "No Currencies Given"}
                                        </span>
                                    )
                                })}
                            </p>
                            <p>
                                <strong>Languages: </strong>
                                {singleCountry.languages && singleCountry.languages.map((item, i) => {
                                    return (
                                        <span key={i}>
                                            {item.name ? item.name : "No Languages Given"}
                                        </span>
                                    )
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="border-countries">
                        <p>
                            <strong>Border countries: </strong>
                        </p>
                        <div className="border-buttons">
                            {borderCountries ? borderCountries.map((country, i) => {
                                const filteredCountry = getBorderCountryName(allCountryData, country)
                                    return (
                                        <button className="border secondary" type="button" key={i} onClick={() => navigate(`/${filteredCountry.name}`)}>
                                            {filteredCountry.name}
                                        </button>
                                    )
                                }) : "No border countries"}
                        </div>
                    </div>    
                </div>    
            </div>
        </section>
    )
}

export default SingleCountryPage
