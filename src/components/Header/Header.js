import React, { useContext } from 'react'
import './_header.scss'
import "../../scss/base/_globals.scss"
import { ThemeContext } from '../../Contexts/ThemeContext'

const Header = () => {
    
   const themes = useContext(ThemeContext)

    return (
        <header className={`header ${themes.theme}`}>
            <nav>
                <h2>
                    Where in the world?
                </h2>
                <button className={`mode ${themes.theme}`} onClick={themes.changeMode}>
                    {themes.theme === "Light" ? <i className="far fa-moon"></i> : <i className="fas fa-moon"></i>}
                    <h5>
                        {themes.theme === "Light" ? "Dark" : "Light"} Mode
                    </h5>            
                </button>
            </nav>
        </header>
    )
}

export default Header