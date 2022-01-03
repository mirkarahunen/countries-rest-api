import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './_singleCountryPage.scss'


const SingleCountryPage = () => {
    const countryName = useParams().name
    const [singleCountry, setSingleCountry] = useState([]);
    const [borderCountries, setBorderCountries] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const responseName = await fetch(`https://restcountries.com/v2/name/${countryName}?fullText=true`)
                const responseData = await responseName.json()

                const borders = responseData[0].borders
                
                if(borders) {
                    const responseCode = await fetch(`https://restcountries.com/v2/alpha?codes=${borders.map(item => item.toLowerCase())}`)
                    const responseDataCode = await responseCode.json()
                    setBorderCountries(responseDataCode)
                }

                if(!responseName.ok) {
                  throw new Error(responseData.message)
                }

                setSingleCountry(responseData[0])
                
                //console.log(responseDataCode);
              } catch (error) {}                 
        }
        fetchData()

    }, [countryName])

    const goBack = () => {
        navigate("/")
    }

    return (
        <section className="single-country">
            <div className="single-country-container">
                <div className="back-button-container">
                    <button type="button" className="back primary" onClick={goBack}>
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
                                {singleCountry.population ? singleCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "No Population Given"}
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
                                    return (
                                        <button className="border secondary" type="button" key={i} onClick={() => navigate(`/${country.name}`)}>
                                            {country.name}
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
