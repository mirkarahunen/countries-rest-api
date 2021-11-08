import React, { useState, useEffect } from 'react'
import './_content.scss'
import SingleCountryContent from './SingleCountryContent'
//import {ApiContext} from '../Contexts/ApiContext'

const Content = (props) => {
    const [allCountryData, setAllCountryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v2/all')
                const responseData = await response.json()

                if(!response.ok) {
                    throw new Error(responseData.message)
                }
                setAllCountryData(responseData)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])

    return (
        <section className="countries-content">
            <div className="container">
                <SingleCountryContent items={allCountryData}/>
                
            </div>
        </section>
        
    )
}

export default Content