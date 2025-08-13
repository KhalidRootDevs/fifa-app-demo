"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, StickerIcon as Stadium } from "lucide-react"
import Image from "next/image"

const hostCountries = [
  {
    name: "United States",
    flag: "/flags/usa.svg",
    cities: [
      { name: "New York", venue: "MetLife Stadium", capacity: 82500, matches: 8 },
      { name: "Los Angeles", venue: "SoFi Stadium", capacity: 70240, matches: 8 },
      { name: "Dallas", venue: "AT&T Stadium", capacity: 80000, matches: 7 },
      { name: "Miami", venue: "Hard Rock Stadium", capacity: 64767, matches: 7 },
      { name: "Atlanta", venue: "Mercedes-Benz Stadium", capacity: 71000, matches: 6 },
      { name: "Philadelphia", venue: "Lincoln Financial Field", capacity: 69176, matches: 6 },
      { name: "Seattle", venue: "Lumen Field", capacity: 69000, matches: 6 },
      { name: "San Francisco", venue: "Levi's Stadium", capacity: 68500, matches: 6 },
      { name: "Houston", venue: "NRG Stadium", capacity: 72220, matches: 6 },
      { name: "Boston", venue: "Gillette Stadium", capacity: 65878, matches: 6 },
    ],
    totalMatches: 66,
  },
  {
    name: "Mexico",
    flag: "/flags/mexico.svg",
    cities: [
      { name: "Mexico City", venue: "Azteca Stadium", capacity: 87523, matches: 8 },
      { name: "Monterrey", venue: "BBVA Stadium", capacity: 53500, matches: 6 },
      { name: "Guadalajara", venue: "Akron Stadium", capacity: 49850, matches: 6 },
    ],
    totalMatches: 20,
  },
  {
    name: "Canada",
    flag: "/flags/canada.svg",
    cities: [
      { name: "Toronto", venue: "BMO Field", capacity: 45500, matches: 7 },
      { name: "Vancouver", venue: "BC Place", capacity: 54500, matches: 7 },
    ],
    totalMatches: 14,
  },
]

export default function HostCountriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">Host Countries</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage World Cup 2026 host countries and venues</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-black dark:text-white">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <Stadium className="h-5 w-5 text-black dark:text-white" />
                  <div className="font-medium text-black dark:text-white">Total Venues</div>
                </div>
                <div className="text-lg font-bold text-black dark:text-white">16</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-black dark:text-white" />
                  <div className="font-medium text-black dark:text-white">Total Cities</div>
                </div>
                <div className="text-lg font-bold text-black dark:text-white">16</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="font-medium text-black dark:text-white">Total Matches</div>
                </div>
                <div className="text-lg font-bold text-black dark:text-white">104</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {hostCountries.map((country) => (
          <Card key={country.name} className="border-gray-200 dark:border-gray-800 md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="relative h-8 w-12 overflow-hidden rounded">
                <Image
                  src={country.flag || "/placeholder.svg"}
                  alt={`${country.name} flag`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-black dark:text-white">{country.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {country.cities.length} cities, {country.totalMatches} matches
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {country.cities.map((city) => (
                  <div key={city.name} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-black dark:text-white">{city.name}</h3>
                      <Badge className="bg-black text-white dark:bg-white dark:text-black">
                        {city.matches} matches
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{city.venue}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Capacity: {city.capacity.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
