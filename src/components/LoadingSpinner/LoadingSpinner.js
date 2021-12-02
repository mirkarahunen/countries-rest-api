import React, { useContext } from "react";
import './_loadingSpinner.scss'
import { ThemeContext } from "../../Contexts/ThemeContext";

const LoadingSpinner = () => {
    const themes = useContext(ThemeContext)

    return (
        <>
        <div className={`spinner ${themes.theme}`}></div>
        <h4>
            Loading...
        </h4>
        </>
    )
}

export default LoadingSpinner