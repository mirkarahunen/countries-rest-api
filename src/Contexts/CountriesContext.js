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
  setSingleCountry: () => {}
})

const CountriesProvider = () => {
    // Stores all API data to be used in an array
    const [allCountryData, setAllCountryData] = useState([]);

    // Values for filter user controls
    const [region, setRegion] = useState("")

    // Displayed list of countries in CountryList component
    const [filteredCountries, setFilteredCountries] = useState([]);

    // Values for search user controls
    const [searchValue, setSearchValue] = useState("");

    


    const fetchRegionData = async (value) => {
      try {
        const response = await fetch(`https://restcountries.com/v2/region/${value}`)
        const responseData = await response.json()

        if(!response.ok) {
          throw new Error(responseData.message)
        }
        setFilteredCountries(responseData)
        
      } catch (error) {}
    }


    useEffect(() => {
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
      fetchAllData()
      
  }, [])

    return { allCountryData, filteredCountries, searchValue, 
            setSearchValue, setFilteredCountries, region, setRegion, 
            fetchRegionData }
  }

  export default CountriesProvider