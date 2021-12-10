import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/_variables.scss'
import './scss/base/_typography.scss'
import './scss/base/_buttons.scss'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import SingleCountryPage from './components/Content/SingleCountryPage';

import ThemeProvider from './Contexts/ThemeContext'
import { ThemeContext } from './Contexts/ThemeContext'
//import CountriesProvider from './Contexts/CountriesContext';
import CountriesProvider from './Contexts/CountriesContext';

const App = () => {
    const { theme, changeMode } = ThemeProvider()
    //const { allCountryData, fetchAllData } = CountriesProvider()
    const routes = (
        <Routes>        
            <Route path="/" exact element={<Home />}  />
            <Route path="/:name" exact element={<SingleCountryPage/>}/>
        </Routes>            
    )
/*
    useCallback(() => {
        fetchAllData()
    }, [fetchAllData])
*/
    return (
            <>
            <ThemeContext.Provider value={{ theme, changeMode}}>
                <CountriesProvider>
                    <Router basename="/">
                        <div className={`App ${theme}`}>
                            <Header />
                            <div className="app-container">
                                <main className={`${theme}`}>    
                                    {routes}            
                                </main>
                            </div>
                        </div>
                    </Router>   
                </CountriesProvider> 
                </ThemeContext.Provider>
        </>
    );
}

export default App;
