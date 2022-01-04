import React from "react";
import './_snowman.scss'


const Snowman = () => {

    return (
        <div className="animation">
        <div className="snowman-container">
            <div className="hat"></div>
            <div className="hat-brim"></div>
            <div className="head"></div>
            <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
            </div>
            <div className="nose"></div>
            <div className="body"></div>
            <div className="right-arm"></div>
            <div className="left-arm"></div>
            
        </div>
        <div className="shadow"></div>
        </div>
    )
}

export default Snowman