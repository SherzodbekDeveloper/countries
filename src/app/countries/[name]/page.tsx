"use client"

import { type Country, useCountry } from "@/src/store/countryStore"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, Users, MapPin, Languages, Coins, Clock, Map, Compass, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SinglePage() {
  const { country, isLoading, isError } = useCountry()
  const params = useParams()
  const cca3 = params.name as string
  const [single, setSingle] = useState<Country | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (country && cca3) {
      const foundCountry = country.find((c) => c.cca3 === cca3)

      if (foundCountry) {
        setSingle(foundCountry)
      } else {
        setSingle(null)
      }
    } else {
      setSingle(null)
    }
  }, [cca3, country])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeleton className="h-64 md:h-80 w-full rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !single) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Country Not Found</h2>
            <p className="text-muted-foreground">We couldnt find information for the requested country.</p>
            <Button className="mt-6" onClick={() => router.push("/")}>
              View All Countries
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const languages = single.languages ? Object.values(single.languages).join(", ") : "N/A"

  const currencies = single.currencies
    ? Object.entries(single.currencies)
      .map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
      .join(", ")
    : "N/A"

  const borderCountries = single.borders ? country?.filter((c) => single.borders?.includes(c.cca3)) : []

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/5">
          <Card className="overflow-hidden">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={single.flags.png || "/placeholder.svg"}
                alt={`Flag of ${single.name.common}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold">{single.name.common}</h1>
              <p className="text-lg text-muted-foreground mt-1">{single.name.official}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {single.region}
                </Badge>
                {single.region && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Compass className="h-3 w-3" />
                    {single.region}
                  </Badge>
                )}
                {single.unMember && <Badge className="bg-primary/10 text-primary border-primary/20">UN Member</Badge>}
              </div>
            </CardContent>
          </Card>

          {(borderCountries?.length ?? 0) > 0 && (
            <Card className="mt-6 py-6">
              <CardHeader>
                <CardTitle className="text-lg">Neighboring Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {borderCountries?.map((border) => (
                    <Button
                      key={border.cca3}
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/country/${border.cca3}`)}
                    >
                      {border.name.common}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="w-full lg:w-3/5">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capital</p>
                      <p className="font-medium">{single.capital?.[0] || "N/A"}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Population</p>
                      <p className="font-medium">{single.population.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Map className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-medium">{single.area.toLocaleString()} km²</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Languages className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-medium">{languages}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Coins className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Currencies</p>
                      <p className="font-medium">{currencies}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timezones</p>
                      <p className="font-medium">{single.timezones?.[0] || "N/A"}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Native Name</p>
                      <p className="font-medium">
                        {single.name.nativeName ? Object.values(single.name.nativeName)[0]?.common || "N/A" : "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Top Level Domain</p>
                      <p className="font-medium">{single.tld?.join(", ") || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Alpha-2 Code</p>
                      <p className="font-medium">{single.cca2}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Alpha-3 Code</p>
                      <p className="font-medium">{single.cca3}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Calling Code</p>
                      <p className="font-medium">
                        {single.idd?.root && single.idd?.suffixes?.[0]
                          ? `${single.idd.root}${single.idd.suffixes[0]}`
                          : "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Driving Side</p>
                      <p className="font-medium capitalize">{single.car?.side || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Start of Week</p>
                      <p className="font-medium capitalize">{single.startOfWeek || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{single.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geography" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-medium">{single.region}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Subregion</p>
                      <p className="font-medium">{single.subregion || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Continent</p>
                      <p className="font-medium">{single.continents?.join(", ") || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Landlocked</p>
                      <p className="font-medium">{single.landlocked ? "Yes" : "No"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Coordinates</p>
                      <p className="font-medium">
                        {single.latlng ? `${single.latlng[0]}, ${single.latlng[1]}` : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Maps:</p>
                    <div className="flex flex-wrap gap-2">
                      {single.maps?.googleMaps && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(single.maps.googleMaps, "_blank")}
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          Google Maps
                        </Button>
                      )}
                      {single.maps?.openStreetMaps && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(single.maps.openStreetMaps, "_blank")}
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          OpenStreetMap
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SinglePage

