import React from 'react'
import './_header.scss'
import "../../scss/base/_globals.scss"

const Header = () => {
    return (
        <header>
            <div className="container">
                <nav>
                    <h1>
                        Where in the world?
                    </h1>
                    <div className="mode">
                        <i className="far fa-moon"></i>
                        <h2>
                            Dark Mode
                        </h2>            
                    </div>
                </nav>
            </div>
            
        </header>
    )
}

export default Header