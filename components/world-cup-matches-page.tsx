"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MatchCard } from "@/components/match-card";

import { SmallAds } from "@/components/small-ads";
import BannerAds from "./features/ads/banner-ads";

interface Match {
  id: string;
  homeTeam: {
    name: string;
    flag: string;
    ranking: number;
  };
  awayTeam: {
    name: string;
    flag: string;
    ranking: number;
  };
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  phase: string;
  group?: string;
  status: "live" | "upcoming" | "completed";
  score?: {
    home: number;
    away: number;
  };
  viewers?: number;
  attendance?: number;
  temperature?: number;
  stats?: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    yellowCards: { home: number; away: number };
    redCards: { home: number; away: number };
  };
}

const phases = [
  { id: "all", name: "All Phases", color: "bg-gray-600" },
  { id: "group", name: "Group Stage", color: "bg-blue-600" },
  { id: "round16", name: "Round of 16", color: "bg-green-600" },
  { id: "quarter", name: "Quarter Final", color: "bg-yellow-600" },
  { id: "semi", name: "Semi Final", color: "bg-orange-600" },
  { id: "final", name: "Final", color: "bg-red-600" },
];

const countries = [
  { id: "all", name: "All Countries", flag: "🌍" },
  { id: "usa", name: "USA", flag: "🇺🇸" },
  { id: "canada", name: "Canada", flag: "🇨🇦" },
  { id: "mexico", name: "Mexico", flag: "🇲🇽" },
];

const statuses = [
  { id: "all", name: "All Matches" },
  { id: "live", name: "Live Now" },
  { id: "upcoming", name: "Upcoming" },
  { id: "completed", name: "Completed" },
];

const sampleMatches: Match[] = [
  {
    id: "1",
    homeTeam: { name: "Brazil", flag: "🇧🇷", ranking: 1 },
    awayTeam: { name: "Argentina", flag: "🇦🇷", ranking: 2 },
    date: "2026-06-15",
    time: "15:00",
    venue: "MetLife Stadium",
    city: "New York",
    country: "USA",
    phase: "group",
    group: "A",
    status: "live",
    score: { home: 2, away: 1 },
    viewers: 2500000,
    attendance: 82500,
    temperature: 24,
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      corners: { home: 6, away: 4 },
      fouls: { home: 8, away: 12 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 1 },
    },
  },
  {
    id: "2",
    homeTeam: { name: "France", flag: "🇫🇷", ranking: 3 },
    awayTeam: { name: "Germany", flag: "🇩🇪", ranking: 4 },
    date: "2026-06-16",
    time: "18:00",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    phase: "group",
    group: "B",
    status: "upcoming",
    viewers: 1800000,
    attendance: 70000,
    temperature: 28,
  },
  {
    id: "3",
    homeTeam: { name: "Spain", flag: "🇪🇸", ranking: 5 },
    awayTeam: { name: "Netherlands", flag: "🇳🇱", ranking: 6 },
    date: "2026-06-17",
    time: "20:00",
    venue: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    phase: "group",
    group: "C",
    status: "upcoming",
    viewers: 2200000,
    attendance: 87000,
    temperature: 22,
  },
  {
    id: "4",
    homeTeam: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ranking: 7 },
    awayTeam: { name: "Italy", flag: "🇮🇹", ranking: 8 },
    date: "2026-06-18",
    time: "16:00",
    venue: "AT&T Stadium",
    city: "Dallas",
    country: "USA",
    phase: "group",
    group: "D",
    status: "upcoming",
    viewers: 1900000,
    attendance: 80000,
    temperature: 32,
  },
  {
    id: "5",
    homeTeam: { name: "Portugal", flag: "🇵🇹", ranking: 9 },
    awayTeam: { name: "Belgium", flag: "🇧🇪", ranking: 10 },
    date: "2026-06-19",
    time: "19:00",
    venue: "BMO Field",
    city: "Toronto",
    country: "Canada",
    phase: "group",
    group: "E",
    status: "upcoming",
    viewers: 1600000,
    attendance: 45000,
    temperature: 18,
  },
  {
    id: "6",
    homeTeam: { name: "Croatia", flag: "🇭🇷", ranking: 11 },
    awayTeam: { name: "Morocco", flag: "🇲🇦", ranking: 12 },
    date: "2026-06-14",
    time: "14:00",
    venue: "Lumen Field",
    city: "Seattle",
    country: "USA",
    phase: "group",
    group: "F",
    status: "completed",
    score: { home: 1, away: 2 },
    viewers: 1400000,
    attendance: 69000,
    temperature: 16,
    stats: {
      possession: { home: 52, away: 48 },
      shots: { home: 10, away: 14 },
      corners: { home: 5, away: 7 },
      fouls: { home: 15, away: 9 },
      yellowCards: { home: 4, away: 2 },
      redCards: { home: 0, away: 0 },
    },
  },
];

export function WorldCupMatchesPage() {
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMatches = sampleMatches.filter((match) => {
    const matchesPhase =
      selectedPhase === "all" || match.phase === selectedPhase;
    const matchesCountry =
      selectedCountry === "all" ||
      match.country.toLowerCase() === selectedCountry;
    const matchesStatus =
      selectedStatus === "all" || match.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPhase && matchesCountry && matchesStatus && matchesSearch;
  });

  const liveMatches = sampleMatches.filter(
    (match) => match.status === "live",
  ).length;
  const upcomingMatches = sampleMatches.filter(
    (match) => match.status === "upcoming",
  ).length;
  const completedMatches = sampleMatches.filter(
    (match) => match.status === "completed",
  ).length;

  return (
    <div className="space-y-8">
      {/* Tournament Stats */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {liveMatches}
              </div>
              <div className="text-sm text-gray-400">Live Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {upcomingMatches}
              </div>
              <div className="text-sm text-gray-400">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {completedMatches}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {sampleMatches.length}
              </div>
              <div className="text-sm text-gray-400">Total Matches</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner Ads */}
      <BannerAds />

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search teams, venues, cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 form-input"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        <motion.div
          initial={false}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <div className="space-y-4 p-4 glass-card rounded-lg">
            {/* Tournament Phase Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-yellow-200">
                Tournament Phase
              </h3>
              <div className="flex flex-wrap gap-2">
                {phases.map((phase) => (
                  <Button
                    key={phase.id}
                    variant={selectedPhase === phase.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`${
                      selectedPhase === phase.id ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${phase.color} mr-2`}
                    />
                    {phase.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Host Country Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-yellow-200">
                Host Country
              </h3>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <Button
                    key={country.id}
                    variant={
                      selectedCountry === country.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCountry(country.id)}
                    className={`${
                      selectedCountry === country.id
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-yellow-200">
                Match Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <Button
                    key={status.id}
                    variant={
                      selectedStatus === status.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedStatus(status.id)}
                    className={`${
                      selectedStatus === status.id
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    {status.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filteredMatches.length} Match
                {filteredMatches.length !== 1 ? "es" : ""} Found
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Updated live
              </div>
            </div>

            <div className="grid gap-6">
              {filteredMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MatchCard match={match} />
                </motion.div>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                <p className="text-gray-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SmallAds />

          {/* Quick Stats */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                Tournament Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Teams:</span>
                  <span className="font-medium">48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Host Countries:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Venues:</span>
                  <span className="font-medium">16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tournament Days:</span>
                  <span className="font-medium">32</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Host Countries */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                Host Countries
              </h3>
              <div className="space-y-3">
                {countries.slice(1).map((country) => (
                  <div
                    key={country.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium">{country.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {country.id === "usa"
                        ? "11"
                        : country.id === "canada"
                          ? "2"
                          : "3"}{" "}
                      venues
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
