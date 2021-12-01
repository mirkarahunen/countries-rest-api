import { createContext, useState, useCallback, useEffect } from 'react'

export const ThemeContext = createContext({
    theme: "",
    setTheme: () => {},
    changeMode: () => {}
})



const ThemeProvider = () => {
    const item = "theme"
    const savedItem = localStorage.getItem("theme")
    const [theme, setTheme] = useState(() => {
        
        return savedItem ? JSON.parse(savedItem) : "Light";
    })
    

    const setLocalItem = (theme, value) => {
        localStorage.setItem(theme, JSON.stringify(value))
    }

    const changeMode = useCallback(() => {
        setTheme(theme === "Light" ? "Dark" : "Light")
    }, [theme])

    useEffect(() => {
        setLocalItem(item, theme) 
    }, [savedItem, theme])

    return { theme, changeMode }
}

export default ThemeProvider

