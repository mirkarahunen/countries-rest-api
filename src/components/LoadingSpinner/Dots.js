import React, { useContext } from "react";
import './_dots.scss'
import { ThemeContext } from "../../Contexts/ThemeContext";

const Dots = () => {
    const themes = useContext(ThemeContext)

    return (
        <>
        <div className={`dots-container ${themes.theme}`}>
            <h4>Loading</h4>
            <div className="dot">.</div>
            <div className="dot delay-1">.</div>
            <div className="dot delay-2">.</div>
            <div className="dot delay-3">.</div>
        </div>
        </>
    )
}

export default Dots