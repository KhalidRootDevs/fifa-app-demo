"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Play, Flame, Trophy, Users } from "lucide-react";

// Updated matches data with venue capacity
const matches = [
  {
    id: 1,
    phase: "Quarter Final",
    homeTeam: {
      name: "Brazil",
      code: "BRA",
      flag: "/flags/brazil.svg",
      score: 2,
      fifaRanking: 1,
    },
    awayTeam: {
      name: "France",
      code: "FRA",
      flag: "/flags/france.svg",
      score: 1,
      fifaRanking: 3,
    },
    status: "live",
    minute: 67,
    venue: "MetLife Stadium",
    city: "New York, USA",
    capacity: "82,500",
    isHot: true,
    date: new Date("2026-12-15T20:00:00"),
  },
  {
    id: 2,
    phase: "Semi Final",
    homeTeam: {
      name: "Argentina",
      code: "ARG",
      flag: "/flags/argentina.svg",
      score: 1,
      fifaRanking: 2,
    },
    awayTeam: {
      name: "Germany",
      code: "GER",
      flag: "/flags/germany.svg",
      score: 0,
      fifaRanking: 4,
    },
    status: "live",
    minute: 78,
    venue: "SoFi Stadium",
    city: "Los Angeles, USA",
    capacity: "70,240",
    isHot: true,
    date: new Date("2026-12-15T18:00:00"),
  },
  {
    id: 3,
    phase: "Group Stage",
    homeTeam: {
      name: "Spain",
      code: "ESP",
      flag: "/flags/spain.svg",
      fifaRanking: 5,
    },
    awayTeam: {
      name: "Netherlands",
      code: "NED",
      flag: "/flags/netherlands.svg",
      fifaRanking: 6,
    },
    status: "upcoming",
    venue: "Estadio Azteca",
    city: "Mexico City, Mexico",
    capacity: "87,523",
    date: new Date("2026-12-16T16:00:00"),
  },
  {
    id: 4,
    phase: "Group Stage",
    homeTeam: {
      name: "England",
      code: "ENG",
      flag: "/flags/england.svg",
      fifaRanking: 7,
    },
    awayTeam: {
      name: "Portugal",
      code: "POR",
      flag: "/flags/portugal.svg",
      fifaRanking: 8,
    },
    status: "upcoming",
    venue: "AT&T Stadium",
    city: "Dallas, USA",
    capacity: "80,000",
    date: new Date("2026-12-16T19:00:00"),
  },
  {
    id: 5,
    phase: "Final",
    homeTeam: {
      name: "Italy",
      code: "ITA",
      flag: "/flags/italy.svg",
      score: 3,
      fifaRanking: 9,
    },
    awayTeam: {
      name: "Belgium",
      code: "BEL",
      flag: "/flags/belgium.svg",
      score: 2,
      fifaRanking: 10,
    },
    status: "live",
    minute: 89,
    venue: "Wembley Stadium",
    city: "London, England",
    capacity: "90,000",
    isHot: true,
    date: new Date("2026-12-15T21:00:00"),
  },
  {
    id: 6,
    phase: "Group Stage",
    homeTeam: {
      name: "Japan",
      code: "JPN",
      flag: "/flags/japan.svg",
      fifaRanking: 11,
    },
    awayTeam: {
      name: "Morocco",
      code: "MAR",
      flag: "/flags/morocco.svg",
      fifaRanking: 12,
    },
    status: "upcoming",
    venue: "Rose Bowl",
    city: "Pasadena, USA",
    capacity: "92,542",
    date: new Date("2026-12-17T14:00:00"),
  },
  {
    id: 7,
    phase: "Round of 16",
    homeTeam: {
      name: "USA",
      code: "USA",
      flag: "/flags/usa.svg",
      score: 2,
      fifaRanking: 13,
    },
    awayTeam: {
      name: "Mexico",
      code: "MEX",
      flag: "/flags/mexico.svg",
      score: 1,
      fifaRanking: 14,
    },
    status: "live",
    minute: 45,
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta, USA",
    capacity: "71,000",
    date: new Date("2026-12-14T19:00:00"),
  },
  {
    id: 8,
    phase: "Third Place",
    homeTeam: {
      name: "Croatia",
      code: "CRO",
      flag: "/flags/croatia.svg",
      fifaRanking: 15,
    },
    awayTeam: {
      name: "Switzerland",
      code: "SUI",
      flag: "/flags/switzerland.svg",
      fifaRanking: 16,
    },
    status: "upcoming",
    venue: "Levi's Stadium",
    city: "Santa Clara, USA",
    capacity: "68,500",
    date: new Date("2026-12-18T15:00:00"),
  },
];

interface MatchListProps {
  compact?: boolean;
}

export function MatchList({ compact = false }: MatchListProps) {
  const [filter, setFilter] = useState<"all" | "live" | "upcoming">("all");

  const filteredMatches = matches.filter((match) => {
    if (filter === "all") return true;
    return match.status === filter;
  });

  const displayMatches = compact
    ? filteredMatches.slice(0, 5)
    : filteredMatches;

  const formatTime = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const matchDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    if (matchDate.getTime() === today.getTime()) {
      return `Today ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (matchDate.getTime() === today.getTime() + 86400000) {
      return `Tomorrow ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const liveCount = matches.filter((m) => m.status === "live").length;
  const upcomingCount = matches.filter((m) => m.status === "upcoming").length;

  return (
    <div className="space-y-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">World Cup 2026 Matches</h2>
        </div>
        {!compact && (
          <Link
            href="/matches"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            View All Matches
          </Link>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === "all"
              ? "bg-white text-black"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          All Matches ({matches.length})
        </button>
        <button
          onClick={() => setFilter("live")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            filter === "live"
              ? "bg-red-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Live ({liveCount})
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === "upcoming"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Upcoming ({upcomingCount})
        </button>
      </div>

      {/* Match List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="divide-y divide-white/10">
          {displayMatches.map((match) => (
            <div
              key={match.id}
              className="p-4 hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                {/* Left Side - Teams */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Phase Badge */}
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                        match.phase === "Group Stage"
                          ? "bg-green-500/20 text-green-400"
                          : match.phase === "Quarter Final"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : match.phase === "Semi Final"
                              ? "bg-orange-500/20 text-orange-400"
                              : match.phase === "Round of 16"
                                ? "bg-blue-500/20 text-blue-400"
                                : match.phase === "Third Place"
                                  ? "bg-pink-500/20 text-pink-400"
                                  : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {match.phase}
                    </span>
                    {match.isHot && (
                      <div className="flex items-center gap-1 text-xs text-orange-400">
                        <Flame className="w-3 h-3" />
                        <span>Hot</span>
                      </div>
                    )}
                  </div>

                  {/* Teams */}
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    {/* Home Team */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                          <Image
                            src={
                              match.homeTeam.flag ||
                              `/placeholder.svg?height=24&width=24&text=${match.homeTeam.code}`
                            }
                            alt={match.homeTeam.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain rounded-full"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                          #{match.homeTeam.fifaRanking}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">
                          {match.homeTeam.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {match.homeTeam.code}
                        </div>
                      </div>
                    </div>

                    {/* Score or VS */}
                    <div className="flex items-center gap-2">
                      {match.status === "live" &&
                      match.homeTeam.score !== undefined &&
                      match.awayTeam.score !== undefined ? (
                        <div className="text-xl font-bold text-center min-w-[60px]">
                          <span className="animate-pulse">
                            {match.homeTeam.score} - {match.awayTeam.score}
                          </span>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm font-medium">
                          VS
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <div className="min-w-0 text-right">
                        <div className="font-medium text-sm truncate">
                          {match.awayTeam.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {match.awayTeam.code}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                          <Image
                            src={
                              match.awayTeam.flag ||
                              `/placeholder.svg?height=24&width=24&text=${match.awayTeam.code}`
                            }
                            alt={match.awayTeam.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain rounded-full"
                          />
                        </div>
                        <div className="absolute -bottom-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                          #{match.awayTeam.fifaRanking}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Status & Actions */}
                <div className="flex items-center gap-4 ml-4">
                  {/* Status & Time */}
                  <div className="text-right min-w-[120px]">
                    {match.status === "live" ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-end gap-2">
                          <div className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                            LIVE
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {match.minute}'
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-xs text-blue-400 font-medium">
                          UPCOMING
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatTime(match.date)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Venue Info with Capacity */}
                  <div className="text-right min-w-[160px] hidden md:block">
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{match.venue}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>Capacity: {match.capacity}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="min-w-[100px]">
                    <Link href={`/match/${match.id}`}>
                      <button
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          match.status === "live"
                            ? "bg-red-500 hover:bg-red-600 text-white group-hover:scale-105"
                            : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                        }`}
                      >
                        {match.status === "live" ? (
                          <>
                            <Play className="w-4 h-4" />
                            Watch Live
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4" />
                            View Details
                          </>
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {compact && displayMatches.length > 0 && (
        <div className="text-center">
          <Link href="/matches">
            <button className="px-6 py-3 border border-white/20 hover:border-white/40 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1">
              View All World Cup Matches
            </button>
          </Link>
        </div>
      )}

      {displayMatches.length === 0 && (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No matches found</h3>
          <p className="text-gray-400 mb-6">
            There are no {filter === "all" ? "" : filter} matches at the moment.
            Check back later for updates.
          </p>
          <button
            onClick={() => setFilter("all")}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Show All Matches
          </button>
        </div>
      )}
    </div>
  );
}
