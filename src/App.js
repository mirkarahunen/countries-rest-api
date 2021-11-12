import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/_variables.scss'
import './scss/base/_typography.scss'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import SingleCountryPage from './components/Content/SingleCountryPage';
//import Search from './components/Search/Search'
//import Content from './components/Content/Content'

import { ThemeContext } from './Contexts/ThemeContext'
import ThemeProvider from './Contexts/ThemeContext'

import { CountriesContext } from './Contexts/CountriesContext';
import CountriesProvider from './Contexts/CountriesContext';

const App = () => {
    const { theme, changeMode, themeStyleMain, themeStyleElements, themeStyleInput, themeStyleHeader } = ThemeProvider()
    const { allCountryData, filteredCountries, searchValue, setSearchValue, setFilteredCountries, region, setRegion, singleCountry, fetchSingleCountryData, fetchRegionData } = CountriesProvider()
 
    let routes;

    routes = (
        <div className="App">
            <Header />
            <main style={ themeStyleMain }>        
                <Routes>        
                    <Route path="/" exact element={<Home />}  />
                    <Route path="/:name" exact element={<SingleCountryPage />}/>
                </Routes>            
            </main>
        </div>
    )


    return (
            <>
            <ThemeContext.Provider 
                value={{ 
                theme, 
                changeMode, 
                themeStyleMain, 
                themeStyleElements, 
                themeStyleInput, 
                themeStyleHeader 
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
                        fetchRegionData,
                        fetchSingleCountryData,
                        singleCountry  
                    }}>
                    <Router>
                        {routes}
                    </Router>   
                </CountriesContext.Provider>
            </ThemeContext.Provider>
        </>
    );
}

export default App;
