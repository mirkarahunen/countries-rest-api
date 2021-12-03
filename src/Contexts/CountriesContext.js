import { createContext, useState } from 'react'

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

const CountriesProvider = () => {
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
      try {
        const response = await fetch(`https://restcountries.com/v2/region/${value}`)
        const responseData = await response.json()

        if(!response.ok) {
          throw new Error(responseData.message)
        }
        setFilteredCountries(responseData)
        
      } catch (error) {}
    }

    const searchCountry = (e) => {
      setSearchValue(e.target.value);
      const filtered = allCountryData.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()));
      setSearchedCountries(filtered)
      if(e.target.value === "") return setSearchedCountries(0)
      
      if(filtered.length === 0) {
        setNoMatches(true)
      } else {
        setNoMatches(false)
      }
  }

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


    return { allCountryData, filteredCountries, searchValue, 
            setSearchValue, setFilteredCountries, region, setRegion, 
            fetchRegionData, noMatches, searchedCountries, searchCountry, fetchAllData }
  }

  export default CountriesProvider