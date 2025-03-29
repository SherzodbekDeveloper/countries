"use client"
import { useEffect, useState, ChangeEvent } from "react"
import { Country, useCountry } from "@/src/store/countryStore"
import { CountryCard } from "./country-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomeSection() {
  const { country, isLoading, isError } = useCountry()
  const [countries, setCountries] = useState<Country[]>([])
  const [searchText, setSearchText] = useState("")
  const [continent, setContinent] = useState("")

  useEffect(() => {
    if (country) {
      setCountries(country)
    }
  }, [country])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase()
    setSearchText(text)
    filterCountries(text, continent)
  }

  const handleContinentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedContinent = e.target.value
    setContinent(selectedContinent)
    filterCountries(searchText, selectedContinent)
  }

  const filterCountries = (text: string, selectedContinent: string) => {
    let filteredData = country ?? []

    if (text) {
      filteredData = filteredData.filter((c) =>
        c.name.common.toLowerCase().includes(text)
      )
    }

    if (selectedContinent) {
      filteredData = filteredData.filter((c) =>
        c.continents?.some((cont) => cont.toLowerCase() === selectedContinent.toLowerCase())
      )
    }

    setCountries(filteredData)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl m-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-7xl m-auto px-4 mt-20">
        <div className="p-6 bg-red-100 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-600">Error loading countries</h2>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl m-auto bg-background px-4 mt-20">
      <div>
        <h1 className="text-3xl font-bold mb-8">Countries of the World</h1>
        <div className="flex gap-4 mb-6 md:flex-row flex-col">
          <input
            type="text"
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a country..."
          />
          <select
            onChange={handleContinentChange}
            className="p-3 border bg-background   rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Continents</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((item) => (
          <CountryCard key={item.cca3} country={item} />
        ))}
      </div>
    </div>
  )
}
