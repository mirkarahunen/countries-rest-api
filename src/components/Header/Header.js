import React, { useContext } from 'react'
import './_header.scss'
import "../../scss/base/_globals.scss"
import { ThemeContext } from '../../Contexts/ThemeContext'

const Header = () => {
    
   const themes = useContext(ThemeContext)

    return (
        <header style={themes.themeStyleHeader}>
            <nav>
                <h1>
                    Where in the world?
                </h1>
                <button className="mode" onClick={themes.changeMode} style={themes.themeStyleHeader}>
                    {themes.theme === "Light" ? <i className="far fa-moon"></i> : <i className="fas fa-moon"></i>}
                    <h4>
                        {themes.theme === "Light" ? "Dark" : "Light"} Mode
                    </h4>            
                </button>
            </nav>
        </header>
    )
}

export default Header