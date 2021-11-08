import React from 'react'
import './_input.scss'
import "../../scss/base/_globals.scss"

import Filter from './Filter/Filter'

const Input = () => {
    return (
        <div className="container">
            <section className="input">
            
                <div className="input-field">
                    <i className="fas fa-search"></i>
                    <input type="text" value="" placeholder="Search for country..." />
                </div>
                <div className="filter-field">
                    <Filter />
                </div>
            
            </section>
        </div>
    )
}

export default Input;