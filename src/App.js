import React, { useState, useEffect } from 'react';
import './App.scss';
import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/_variables.scss'
import './scss/base/_typography.scss'

//import ApiProvider from './components/Contexts/ApiContext';
//import { ApiContext } from './Contexts/ApiContext';

import Header from './components/Header/Header'
import Search from './components/Search/Search'
import Content from './components/Content/Content'

import { ThemeContext } from './Contexts/ThemeContext'
import ThemeProvider from './Contexts/ThemeContext';

const App = () => {
    
    const [allCountryData, setAllCountryData] = useState([]);
    const { theme, setTheme, themeStyleMain, themeStyleElements, themeStyleInput, themeStyleHeader, handleThemeToggle } = ThemeProvider()
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v2/all')
                const responseData = await response.json()

                if(!response.ok) {
                    throw new Error(responseData.message)
                }
                setAllCountryData(responseData)
            } catch (error) {}
        }
        fetchData()
        
    }, [])

    return (
        <ThemeContext.Provider value={{theme, setTheme, themeStyleMain, themeStyleElements, themeStyleInput, themeStyleHeader, handleThemeToggle}}>
            <div className="App">
                <Header />
                <main style={ themeStyleMain }>
                    <Search data={allCountryData} />
                    <Content items={allCountryData}/>
                </main>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
