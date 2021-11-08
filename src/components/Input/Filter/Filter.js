import React, { useState } from 'react'
import './_filter.scss'
import "../../../scss/base/_globals.scss"

const Filter = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const regions = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

    // Trigger dropdown menu
    const handleSelectClick = () => {
        !dropdownOpen ? setDropdownOpen(true) : setDropdownOpen(false)
        
    }

// Called each time user selects a region in the filter
 
    return (
        <div 
            className="select" 
            tabIndex="1" 
        >   
        <label className="option" onClick={handleSelectClick}>
            Filter by Region 
            {dropdownOpen ? <i className="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}
        </label>


        <div className="filter-options">
            {regions.map((region, i) => {
                return (
                    <div 
                        className={dropdownOpen ? "filter-option is-open" : "filter-option"}
                        key={i}
                        value={region}
                        readOnly={true}
                    >
                        {region}
                    </div>
                )
            })}
            
        </div>
        </div>
    )
}

export default Filter