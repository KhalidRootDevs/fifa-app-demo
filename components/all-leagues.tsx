"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Trophy, X, Globe, Calendar } from "lucide-react";
import { leagues } from "@/lib/database/leagues";

// Region filters
const regions = [
  { id: "all", name: "All Regions" },
  { id: "europe", name: "Europe" },
  { id: "england", name: "England" },
  { id: "spain", name: "Spain" },
  { id: "germany", name: "Germany" },
  { id: "italy", name: "Italy" },
  { id: "france", name: "France" },
  { id: "netherlands", name: "Netherlands" },
  { id: "portugal", name: "Portugal" },
];

export function AllLeagues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Filter leagues based on search query and selected region
  const filteredLeagues = leagues.filter((league) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" || league.name.toLowerCase().includes(searchLower);

    // Region filter
    const matchesRegion =
      selectedRegion === "all" ||
      league.region.toLowerCase() === selectedRegion.toLowerCase();

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-white/40"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Filter */}
          <div className="md:w-48">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leagues Grid */}
      {filteredLeagues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeagues.map((league) => (
            <Link key={league.id} href={`/leagues/${league.id}`}>
              <motion.div
                className="glass-card rounded-xl overflow-hidden h-full"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-40">
                  <Image
                    src={league.background || "/placeholder.svg"}
                    alt={league.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center p-2">
                        <Image
                          src={league.icon || "/placeholder.svg"}
                          alt={league.name}
                          width={30}
                          height={30}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{league.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Globe className="w-3 h-3" />
                          <span>{league.region}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Current Champion:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {league.currentChampion}
                      </span>
                      <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center">
                        <Image
                          src={league.championLogo || "/placeholder.svg"}
                          alt={league.currentChampion}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Next match:{" "}
                        {new Date(league.nextMatchDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>{league.teams} teams</div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No leagues found</h3>
          <p className="text-gray-400 mb-6">
            We couldn't find any leagues matching your search criteria. Try
            adjusting your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("all");
            }}
            className="gradient-bg text-white px-6 py-2 rounded-lg font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
