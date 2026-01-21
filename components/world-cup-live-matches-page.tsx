"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Filter, X, Trophy, MapPin, Users, Clock } from "lucide-react";
import { liveMatches } from "@/lib/database/matches";

// Tournament phases for filtering
const phases = [
  { id: "group", name: "Group Stage", color: "bg-green-500/20 text-green-400" },
  { id: "round16", name: "Round of 16", color: "bg-blue-500/20 text-blue-400" },
  {
    id: "quarter",
    name: "Quarter Final",
    color: "bg-yellow-500/20 text-yellow-400",
  },
  { id: "semi", name: "Semi Final", color: "bg-orange-500/20 text-orange-400" },
  { id: "final", name: "Final", color: "bg-red-500/20 text-red-400" },
];

// Host countries for filtering
const hostCountries = [
  { id: "usa", name: "USA", flag: "/flags/usa.svg" },
  { id: "canada", name: "Canada", flag: "/flags/canada.svg" },
  { id: "mexico", name: "Mexico", flag: "/flags/mexico.svg" },
];

export function WorldCupLiveMatchesPage() {
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"viewers" | "minute" | "phase">(
    "viewers",
  );

  // Filter matches based on selected phases, countries, and search query
  const filteredMatches = liveMatches.filter((match) => {
    // Phase filter
    const matchesPhase =
      selectedPhases.length === 0 ||
      selectedPhases.some((phase) =>
        match.phase.toLowerCase().includes(phase.toLowerCase()),
      );

    // Country filter (based on venue city)
    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.some((country) =>
        match.city.toLowerCase().includes(country.toLowerCase()),
      );

    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      match.homeTeam.name.toLowerCase().includes(searchLower) ||
      match.awayTeam.name.toLowerCase().includes(searchLower) ||
      match.phase.toLowerCase().includes(searchLower) ||
      match.venue.toLowerCase().includes(searchLower);

    return matchesPhase && matchesCountry && matchesSearch;
  });

  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === "viewers") {
      return (
        Number.parseFloat(b.viewers.replace(/[^0-9.]/g, "")) -
        Number.parseFloat(a.viewers.replace(/[^0-9.]/g, ""))
      );
    } else if (sortBy === "minute") {
      return b.minute - a.minute;
    } else {
      return a.phase.localeCompare(b.phase);
    }
  });

  // Toggle phase selection
  const togglePhase = (phaseId: string) => {
    setSelectedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId],
    );
  };

  // Toggle country selection
  const toggleCountry = (countryId: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryId)
        ? prev.filter((id) => id !== countryId)
        : [...prev, countryId],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedPhases([]);
    setSelectedCountries([]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Tournament Info Banner */}
      <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-blue-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">FIFA World Cup 2026</h2>
              <p className="text-gray-400">Live from USA, Canada & Mexico</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {sortedMatches.length}
              </div>
              <div className="text-gray-400">Live Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">48</div>
              <div className="text-gray-400">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">104</div>
              <div className="text-gray-400">Matches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search teams, venues, or phases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-white/40"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "viewers" | "minute" | "phase")
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
            >
              <option value="viewers">Sort by Viewers</option>
              <option value="minute">Sort by Match Time</option>
              <option value="phase">Sort by Phase</option>
            </select>
          </div>

          {/* Filter Button */}
          <button
            className="md:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {selectedPhases.length + selectedCountries.length > 0 && (
              <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {selectedPhases.length + selectedCountries.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Options */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
            {/* Phase Filters */}
            <div>
              <h3 className="text-sm font-medium mb-2">Tournament Phase</h3>
              <div className="flex flex-wrap gap-2">
                {phases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => togglePhase(phase.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPhases.includes(phase.id)
                        ? phase.color + " border border-current"
                        : "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20"
                    }`}
                  >
                    {phase.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Host Country Filters */}
            <div>
              <h3 className="text-sm font-medium mb-2">Host Country</h3>
              <div className="flex flex-wrap gap-2">
                {hostCountries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => toggleCountry(country.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCountries.includes(country.id)
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <Image
                      src={country.flag || "/placeholder.svg"}
                      alt={country.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {(selectedPhases.length > 0 || selectedCountries.length > 0) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Live Matches Count */}
      <div className="flex items-center gap-2 text-lg font-medium">
        <Flame className="w-5 h-5 text-red-500" />
        <span>{sortedMatches.length} Live World Cup Matches</span>
      </div>

      {/* Live Matches Grid */}
      {sortedMatches.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedMatches.map((match) => (
            <motion.div
              key={match.id}
              className="glass-card rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Match Header */}
              <div className="bg-gradient-to-r from-black/50 to-transparent p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        match.phase === "Group Stage"
                          ? "bg-green-500/20 text-green-400"
                          : match.phase === "Quarter Final"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : match.phase === "Semi Final"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {match.phase}
                    </span>
                    {match.group && (
                      <span className="text-xs text-gray-400">
                        {match.group}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                      LIVE
                    </div>
                    <span className="text-xs text-gray-300">
                      {match.minute}'
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {match.venue}, {match.city}
                  </span>
                </div>
              </div>

              {/* Teams and Score */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <Image
                          src={match.homeTeam.flag || "/placeholder.svg"}
                          alt={match.homeTeam.name}
                          width={30}
                          height={30}
                          className="w-8 h-8 object-contain rounded-full"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                        #{match.homeTeam.fifaRanking}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {match.homeTeam.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {match.homeTeam.code}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold score-pulse">
                      {match.homeTeam.score} - {match.awayTeam.score}
                    </div>
                    <div className="text-xs text-gray-400">
                      {match.minute} min
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {match.awayTeam.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {match.awayTeam.code}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <Image
                          src={match.awayTeam.flag || "/placeholder.svg"}
                          alt={match.awayTeam.name}
                          width={30}
                          height={30}
                          className="w-8 h-8 object-contain rounded-full"
                        />
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                        #{match.awayTeam.fifaRanking}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Stats */}
                <div className="grid grid-cols-4 gap-3 text-sm mb-4">
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-1">Possession</div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
                        style={{ width: `${match.stats.possession[0]}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full mt-1">
                      <span className="text-xs">
                        {match.stats.possession[0]}%
                      </span>
                      <span className="text-xs">
                        {match.stats.possession[1]}%
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-1">Shots</div>
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium">
                        {match.stats.shots[0]}
                      </span>
                      <span className="text-sm font-medium">
                        {match.stats.shots[1]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-1">Corners</div>
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium">
                        {match.stats.corners[0]}
                      </span>
                      <span className="text-sm font-medium">
                        {match.stats.corners[1]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-1">Cards</div>
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium text-yellow-500">
                        {match.stats.yellowCards[0]}
                      </span>
                      <span className="text-sm font-medium text-yellow-500">
                        {match.stats.yellowCards[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{match.attendance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{match.temperature}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{match.viewers} watching</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/match/${match.id}`}>
                  <motion.button
                    className="w-full gradient-bg text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Live - FIFA World Cup 2026
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No live matches found</h3>
          <p className="text-gray-400 mb-6">
            There are no live World Cup matches matching your search criteria.
            Try adjusting your filters or check back later.
          </p>
          <button
            onClick={clearFilters}
            className="gradient-bg text-white px-6 py-2 rounded-lg font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
