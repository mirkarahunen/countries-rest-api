import { createContext, useState} from 'react'

export const ThemeContext = createContext({
    theme: "Light",
    setTheme: () => {},
    themeStyleMain: {},
    themeStyleElements: {},
    themeStyleInput: {}, 
    handleThemeToggle: () => {}
})



const ThemeProvider = (props) => {
    //const {themeStyleMain, themeStyleElements, themeStyleInput, themeStyleHeader, handleThemeToggle} = useContext(ThemeContext)
    const [theme, setTheme] = useState("Light")
   
    

    const lightThemeMain = {
        color: "hsl(200, 15%, 8%)",
        backgroundColor: "hsl(0, 0%, 98%)"
    }
    
    const lightThemeElements = {
        backgroundColor: "hsl(0, 0%, 100%)",
        //boxShadow: "0 0 40px -20px hsl(209, 23%, 22%)"
    }
    
    const lightThemeInput = {
        color: "hsl(200, 15%, 8%)"
    }

    const lightThemeHeader = {
        color: "hsl(200, 15%, 8%)",
        backgroundColor: "hsl(0, 0%, 100%)"
    }
    
    const darkThemeMain = {
        color: "hsl(0, 0%, 100%)",
        backgroundColor: "hsl(207, 26%, 17%)"
    }
    
    const darkThemeElements = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "hsl(0, 0%, 100%)"
        //boxShadow: "0 0 40px -20px hsl(209, 23%, 22%)"
    }
    
    const darkThemeInput = {
        color: "hsl(0, 0%, 100%)",
        boxShadow: "none",
        backgroundColor: "hsl(209, 23%, 22%)"
    }

   
    const common = {
        transition: "all .5s ease"
    }
    
    const themeStyleMain = {
        ...common,
        ...(theme === "Light" ? lightThemeMain : darkThemeMain)
    }   

    const themeStyleElements = {
        ...common,
        ...(theme === "Light" ? lightThemeElements : darkThemeElements)
    } 

    const themeStyleInput = {
        ...common,
        ...(theme === "Light" ? lightThemeInput : darkThemeInput)
    }

    const themeStyleHeader = {
        ...common,
        ...(theme === "Light" ? lightThemeHeader : darkThemeElements)
    }
    
    const handleThemeToggle = () => {
        setTheme(theme === "Light" ? "Dark" : "Light")
    }

    return {theme, setTheme, themeStyleMain, themeStyleElements, themeStyleInput, themeStyleHeader, handleThemeToggle}
/*
    return (
        <ThemeContext.Provider
            value={{
                theme: theme,
                setTheme: setTheme,
                themeStyleMain: themeStyleMain,
                themeStyleElements: themeStyleElements,
                themeStyleInput: themeStyleInput, 
                themeStyleHeader: themeStyleHeader,
                handleThemeToggle: handleThemeToggle
            }}>
                {props}
        </ThemeContext.Provider>
        
    )*/
}

export default ThemeProvider

