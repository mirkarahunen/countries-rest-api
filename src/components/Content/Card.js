import React, { useContext } from 'react'
import './_card.scss'
import { ThemeContext } from '../../Contexts/ThemeContext'
//import { CountriesContext } from '../../Contexts/CountriesContext'

const Card = (props) => {
    const themes = useContext(ThemeContext)
    //const [singleCountry, setSingleCountry] = useState({});
/*
    const fetchSingleCountryData = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v2/name/${props.name}`)
          const responseData = await response.json()
          
          if(!response.ok) {
            throw new Error(responseData.message)
          }
          setSingleCountry(responseData[0])
           
        } catch (error) {}
        window.location = `/${props.name}`
      }
*/
    
const fetch = () => {
    //fetchSingleCountryData(props.name)
    //console.log(singleCountry);
    window.location = `/${props.name}`
}

    return (
        <div className="card" style={themes.themeStyleElements} >
            <img src={props.flag} alt="country-flag"/>
            <h2>{props.name}</h2>
            <div className="country-details">
                <span><strong>Population: </strong>{props.population}</span>
                <span><strong>Region: </strong>{props.region}</span>
                <span><strong>Capital: </strong>{props.capital}</span>
            </div>
            <div className="card rect-bg">
                {/*
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua.
                </p>
                */}
                <button className="read-more" type="button" onClick={fetch}>
                    Read more
                </button>
            </div>
        </div>
    )

}

export default Card;