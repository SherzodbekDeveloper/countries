import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Globe } from "lucide-react"
import { Country } from "@/src/store/countryStore"


interface CountryCardProps {
     country: Country
}

export function CountryCard({ country }: CountryCardProps) {
     return (
          <Card className="overflow-hidden transition-all bg-background/10 hover:shadow-md">
               <div className="relative h-56 w-full overflow-hidden">
                    <Image
                         src={country.flags.png || "/placeholder.svg"}
                         alt={`Flag of ${country.name.common}`}
                         fill
                         className="object-cover"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
               </div>
               <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                         <MapPin className="h-4 w-4" />
                         <span>{country.capital?.[0] || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                         <Users className="h-4 w-4" />
                         <span>{country.population.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                         <Globe className="h-4 w-4" />
                         <span>{country.region}</span>
                    </div>
               </CardContent>
               <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Badge variant="outline">{country.cca3}</Badge>
                    <Link href={`countries/${country.cca3}`} className="text-sm font-medium text-primary hover:underline">
                         View Details
                    </Link>
               </CardFooter>
          </Card>
     )
}

