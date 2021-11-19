import React, { useState, useContext } from 'react'
import './_input.scss'
import './_filter.scss'
import './_search.scss'
import { ThemeContext } from '../../Contexts/ThemeContext'
import { CountriesContext } from '../../Contexts/CountriesContext'

const Search = () => {
    const themes = useContext(ThemeContext)
    const countries = useContext(CountriesContext)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    const data = countries.allCountryData
    
    const handleSelect = (e) => {
        countries.fetchRegionData(e.target.children[0].value.toLowerCase());        
    }

    // Trigger dropdown menu
    const handleSelectClick = () => !dropdownOpen ? setDropdownOpen(true) : setDropdownOpen(false)   

    const searchCountry = (e) => {
        countries.setSearchValue(e.target.value);
        const filtered = data.filter(country => country.name.toLowerCase().includes(countries.searchValue.toLowerCase()));
        countries.setFilteredCountries(filtered)
    }

    
    return (
        <section className="search" style={themes.themeStyleMain}>
            {/*  ---- INPUT SEARCH ---- */}
            <div className="input">
                <i className="fas fa-search"></i>
                <input type="text" style={themes.themeStyleInput} value={themes.setSearchValue} onChange={searchCountry} placeholder="Search for country..." />
            </div>
            
            {/* ---- FILTER DROPDOWN ---- */}
            <div className="filter">
                <button className="option" onClick={handleSelectClick} type="button" style={themes.themeStyleInput}>
                    Filter by Region 
                    {dropdownOpen ? <i className="fas fa-chevron-down is-open"></i> : <i className="fas fa-chevron-down"></i>}
                </button>
                <div className="select" tabIndex="1" value={countries.region} >

                    <div style={themes.themeStyleInput} className={dropdownOpen ? "filter-options is-open" : "filter-options"} >
                        {regions.map((item, i) => {
                            return (
                                <div className="filter-option" key={i} onClick={handleSelect}>
                                    <input hidden defaultValue={item} type="radio"/>
                                    {item}
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