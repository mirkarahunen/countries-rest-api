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

const CountriesProvider = (props) => {
    // Stores all API data to be used in an array
    const [allCountryData, setAllCountryData] = useState([]);

    // Values for filter user controls
    const [region, setRegion] = useState("")

    // Displayed list of countries in CountryList component
    const [filteredCountries, setFilteredCountries] = useState([]);

    // Country shown on Single Country Page
    const [singleCountry, setSingleCountry] = useState({});

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


    const fetchSingleCountryData = async (name) => {

      try {
        const response = await fetch(`https://restcountries.com/v2/name/${name}`)
        const responseData = await response.json()

        if(!response.ok) {
          throw new Error(responseData.message)
        }
        setSingleCountry(responseData)
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
          } catch (error) {}
      }
      fetchAllData()
      
  }, [])

    return { allCountryData, filteredCountries, searchValue, 
            setSearchValue, setFilteredCountries, region, setRegion, 
            fetchRegionData, fetchSingleCountryData, singleCountry, setSingleCountry }

  }

  export default CountriesProvider