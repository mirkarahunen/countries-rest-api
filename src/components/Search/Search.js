import React, { useState, useContext} from 'react'
//import "../../scss/base/_globals.scss"
//import Input from './Input/Input'
import './_input.scss'
//import Filter from './Filter/Filter'
import './_filter.scss'
import './_search.scss'
import { ThemeContext } from '../../Contexts/ThemeContext'

const Search = (props) => {
    const { themeStyleMain, themeStyleElements, themeStyleInput } = useContext(ThemeContext)
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const data = props.data

    const handleInput = (e) => {
        setRegion(e.target.value);
        setSearch(e.target.value);
    }

    // Trigger dropdown menu
    const handleSelectClick = () => !dropdownOpen ? setDropdownOpen(true) : setDropdownOpen(false)   

    const searchCountry = (e) => {
        setSearch(e.target.value);
        let filtered = data.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
        setSearchResult(filtered)

        if (searchResult) {
            
        }
    }

    
    return (
        <section className="search" style={themeStyleMain}>
            {/*<Input value={search} onChange={handleSearch}/>*/}
            <div className="input">
                {/*<i className="fas fa-search"></i>*/}
                <input type="text" style={themeStyleInput} value={search} onChange={searchCountry} placeholder="Search for country..." />
                
            </div>
            {/*<Filter value={region} onChange={handleSearch}/>*/}
            <div className="filter-field">
                <button className="option" onClick={handleSelectClick} type="button" style={themeStyleElements}>
                    Filter by Region 
                    {dropdownOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                </button>
                <div className="select" tabIndex="1" value={region} >
                    <div className={dropdownOpen ? "filter-options is-open" : "filter-options"} style={themeStyleElements}>
                        {regions.map((item, i) => {
                            return (
                                <div 
                                    className="filter-option"
                                    key={i}
                                    value={item}
                                    onClick={handleInput}
                                >
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