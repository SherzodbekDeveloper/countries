"use client"
import { useCountry } from "@/src/store/countryStore"
import { CountryCard } from "@/components/country-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomeSection() {
  const { country, isLoading, isError } = useCountry()

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
        <div className="p-6 bg-destructive/10 rounded-lg text-center">
          <h2 className="text-xl font-bold text-destructive">Error loading countries</h2>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl m-auto px-4 mt-20">
      <h1 className="text-3xl font-bold mb-8">Countries of the World</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {country?.map((item) => (
          <CountryCard key={item.cca3} country={item} />
        ))}
      </div>
    </div>
  )
}

