import React, { useContext } from 'react'
import './_header.scss'
import "../../scss/base/_globals.scss"
import { ThemeContext } from '../../Contexts/ThemeContext'

const Header = () => {
    
   const {theme, themeStyleHeader, handleThemeToggle} = useContext(ThemeContext)

    return (
        <header style={themeStyleHeader}>
            <nav>
                <h1>
                    Where in the world?
                </h1>
                <button className="mode" onClick={handleThemeToggle} style={themeStyleHeader}>
                    {theme === "Light" ? <i className="far fa-moon"></i> : <i className="fas fa-moon"></i>}
                    <h4>
                        {theme === "Light" ? "Dark" : "Light"} Mode
                    </h4>            
                </button>
            </nav>
        </header>
    )
}

export default Header