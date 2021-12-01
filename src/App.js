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

import { ThemeContext } from './Contexts/ThemeContext'
import ThemeProvider from './Contexts/ThemeContext'

import { CountriesContext } from './Contexts/CountriesContext';
import CountriesProvider from './Contexts/CountriesContext';

const App = () => {
    const { theme, changeMode } = ThemeProvider()
    const { allCountryData, filteredCountries, searchValue, setSearchValue, setFilteredCountries, region, setRegion, fetchRegionData } = CountriesProvider()
 
    const routes = (
           
        <Routes>        
            <Route path="/" exact element={<Home />}  />
            <Route path="/:name" exact element={<SingleCountryPage />}/>
        </Routes>            
    )

    return (
            <>
            <ThemeContext.Provider 
                value={{ 
                theme, 
                changeMode
            }}>
                <CountriesContext.Provider 
                    value={{ 
                        allCountryData, 
                        filteredCountries, 
                        searchValue, 
                        setSearchValue, 
                        setFilteredCountries, 
                        region, 
                        setRegion,
                        fetchRegionData
                    }}>
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
                </CountriesContext.Provider>
            </ThemeContext.Provider>
        </>
    );
}

export default App;
