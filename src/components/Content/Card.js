import React from 'react'
import './_card.scss'

const Card = (props) => {
    return (
        <div className="card">
            <img src={props.flag} alt="country-flag"/>
            <h3>{props.name}</h3>
            <div className="country-details">
                <p><strong>Population: </strong>{props.population}</p>
                <p><strong>Region: </strong>{props.region}</p>
                <p><strong>Capital: </strong>{props.capital}</p>
            </div>
        </div>
    )

}

export default Card;