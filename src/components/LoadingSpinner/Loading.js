import React, { useContext } from "react";
import './_loading.scss'
import { ThemeContext } from "../../Contexts/ThemeContext";
import Dots from "./Dots";


const Loading = () => {
    const themes = useContext(ThemeContext)

    return (        
        <div className={`loading ${themes.theme}`}>
            <Dots/>
            
        </div>
    )
}

export default Loading