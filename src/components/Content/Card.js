import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import './_card.scss'
import { ThemeContext } from '../../Contexts/ThemeContext'

const Card = (props) => {
    const themes = useContext(ThemeContext)
    const navigate = useNavigate()

    const goToCountry = () => {
        navigate(`/${props.name}`)
    }

    return (
        <div className={`card ${themes.theme}`} onClick={goToCountry}>
            <div className="img-container">
                <img src={props.flag} alt="country-flag"/>
            </div>

            <h4>{props.name}</h4>
            <div className="country-details">
                <span><strong>Population: </strong>{props.population ? props.population : "0"}</span>
                <span><strong>Region: </strong>{props.region ? props.region : "No region given"}</span>
                <span><strong>Capital: </strong>{props.capital ? props.capital : "No capital given"}</span>
            </div>
        </div>
    )

}

export default Card;