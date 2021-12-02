import React, { useState, useContext } from 'react'
import './_input.scss'
import './_dropdown.scss'
import './_search.scss'
import { ThemeContext } from '../../Contexts/ThemeContext'
import { CountriesContext } from '../../Contexts/CountriesContext'

const Search = () => {
    const themes = useContext(ThemeContext)
    const countries = useContext(CountriesContext)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];
    const data = countries.allCountryData
    const [buttonText, setButtonText] = useState("")
  
    const handleSelect = (e) => {
        const data = e.target.value
        countries.fetchRegionData(data.toLowerCase());
        setButtonText(data)
        setDropdownOpen(false)
        document.querySelector(".input input").value = ""
    }

   
    // Trigger dropdown menu
    const handleSelectClick = () => !dropdownOpen ? setDropdownOpen(true) : setDropdownOpen(false)

    const searchCountry = (e) => {
        countries.setSearchValue(e.target.value);
        const filtered = data.filter(country => country.name.toLowerCase().includes(countries.searchValue.toLowerCase()));
        countries.setFilteredCountries(filtered)
        if(e.target.value === "") return countries.setFilteredCountries(0)
    }

    
    return (
        <section className={`search ${themes.theme}`}>
            {/*  ---- INPUT SEARCH ---- */}
            <div className="input">
                <i className={`fas fa-search ${themes.theme}`}></i>
                <input className={`${themes.theme}`} type="text" value={themes.setSearchValue} onChange={searchCountry} placeholder="Search for country..." />
            </div>
            
            {/* ---- FILTER DROPDOWN ---- */}
            <div className="filter">
                <button onClick={handleSelectClick} type="button" className={`option ${themes.theme}`}>
                    {buttonText ? buttonText : "Filter by Region"} 
                    {dropdownOpen ? <i className="fas fa-chevron-down is-open"></i> : <i className="fas fa-chevron-down"></i>}
                </button>
                <div className="select" tabIndex="1" value={countries.region} >

                    <div className={dropdownOpen ? `filter-options is-open ${themes.theme}` : `filter-options ${themes.theme}`} >
                        {regions.map((item, i) => {
                            return (
                                <div className="filter-option" key={i} onClick={handleSelect}>
                                    <input value={item} name={item} type="text" disabled/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Search