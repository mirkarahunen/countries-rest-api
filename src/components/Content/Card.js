import React from 'react'
import './_card.scss'


const Card = (props) => {
    

    return (
        <div className="card" style={props.style} >
            <img src={props.flag} alt="country-flag"/>
            <h2>{props.name}</h2>
            <div className="country-details">
                <span><strong>Population: </strong>{props.population}</span>
                <span><strong>Region: </strong>{props.region}</span>
                <span><strong>Capital: </strong>{props.capital}</span>
            </div>
            <div className="card rect-bg">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua.
                </p>
                <button className="read-more" type="button">
                    Read more
                </button>
            </div>
        </div>
    )

}

export default Card;