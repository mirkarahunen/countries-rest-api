import { createContext, useState, useEffect } from 'react'

export const CountriesContext = createContext({
  allCountryData: [],
  filteredCountries: [],
  singleCountry: {},
  searchValue: "",
  setSearchValue: () => {}, 
  setFilteredCountries: () => {},
  region: "",
  setRegion: () => {},
  fetchRegionData: () => {},
  fetchSingleCountryData: () => {},
  setSingleCountry: () => {},
  setSearchedCountries: () => {},
  setNoMatches: () => {},
  searchedCountries: [],
  noMatches: false,
  fetchAllData: () => {}
})

const CountriesProvider = (props) => {
    // Stores all API data to be used in an array
    const [allCountryData, setAllCountryData] = useState([]);

    // Values for filter user controls
    const [region, setRegion] = useState("")

    // Displayed list of countries in CountryList component
    const [filteredCountries, setFilteredCountries] = useState([]);

    // Values for search user controls
    const [searchValue, setSearchValue] = useState("");

    const [searchedCountries, setSearchedCountries] = useState([]);
    const [noMatches, setNoMatches] = useState(false)

    const fetchRegionData = async (value) => {
      if(value === "all") {
        setFilteredCountries([])
      } else {
          try {
            const response = await fetch(`https://restcountries.com/v2/region/${value}`)
            const responseData = await response.json()
        
            sessionStorage.setItem("filtered", JSON.stringify(responseData.slice(0, 12)))
            
            if(!response.ok) {
              throw new Error(responseData.message)
            }
              setFilteredCountries(responseData)
              
            } catch (error) {}
        }
    }
    
    
    useEffect(() => {
      
      if(searchValue.length > 0) {
        const filtered = allCountryData.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()));
        sessionStorage.setItem("scroll", 0)
        setSearchedCountries(filtered)
        
        if(filtered.length === 0) {
          setNoMatches(true)
        } else {
          setNoMatches(false)
        }
  
        if(filteredCountries.length > 0) {
          sessionStorage.setItem("scroll", 0)
          const newCountries = filteredCountries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
          
            setSearchedCountries(newCountries)
        
            if(newCountries.length === 0) {
                setNoMatches(true)
            } else {
                setNoMatches(false)
            }
        } 
      } else {
        setSearchedCountries(0)
      }
      
  
    }, [searchValue, allCountryData, filteredCountries])

    

   
      const fetchAllData = async () => {
          try {
              const response = await fetch('https://restcountries.com/v2/all')
              const responseData = await response.json()

              if(!response.ok) {
                  throw new Error(responseData.message)
              }
              setAllCountryData(responseData)
              sessionStorage.setItem("countries", JSON.stringify(responseData.slice(0, 12)))
          } catch (error) {}
      }
      
      useEffect(() => {
      fetchAllData()
      
  }, [])

  return (
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
            //searchCountry,
            searchedCountries,
            noMatches,
            fetchAllData
        }}>
          {props.children}
    </CountriesContext.Provider>
  )
}

  export default CountriesProvider