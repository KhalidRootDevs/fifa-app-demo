"use client";

import { Trophy, MapPin, Users, Star } from "lucide-react";

export function WorldCupSidebar() {
  const tournamentPhases = [
    {
      phase: "Group Stage",
      matches: 48,
      status: "completed",
      color: "text-green-400",
    },
    {
      phase: "Round of 16",
      matches: 8,
      status: "live",
      color: "text-yellow-400",
    },
    {
      phase: "Quarter Finals",
      matches: 4,
      status: "upcoming",
      color: "text-gray-400",
    },
    {
      phase: "Semi Finals",
      matches: 2,
      status: "upcoming",
      color: "text-gray-400",
    },
    { phase: "Final", matches: 1, status: "upcoming", color: "text-gray-400" },
  ];

  const hostCountries = [
    { country: "United States", flag: "🇺🇸", cities: 11, venues: 11 },
    { country: "Canada", flag: "🇨🇦", cities: 2, venues: 2 },
    { country: "Mexico", flag: "🇲🇽", cities: 3, venues: 3 },
  ];

  const topScorers = [
    { player: "Kylian Mbappé", country: "🇫🇷", goals: 8 },
    { player: "Lionel Messi", country: "🇦🇷", goals: 7 },
    { player: "Harry Kane", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", goals: 6 },
    { player: "Neymar Jr", country: "🇧🇷", goals: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Tournament Phases */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Tournament Phases
        </h3>
        <div className="space-y-3">
          {tournamentPhases.map((phase) => (
            <div
              key={phase.phase}
              className="flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium text-white">
                  {phase.phase}
                </div>
                <div className="text-xs text-gray-400">
                  {phase.matches} matches
                </div>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded capitalize ${
                  phase.status === "completed"
                    ? "bg-green-500/20 text-green-400"
                    : phase.status === "live"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {phase.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Host Countries */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-yellow-400" />
          Host Countries
        </h3>
        <div className="space-y-3">
          {hostCountries.map((host) => (
            <div
              key={host.country}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{host.flag}</span>
                <div>
                  <div className="text-sm font-medium text-white">
                    {host.country}
                  </div>
                  <div className="text-xs text-gray-400">
                    {host.cities} cities
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400">{host.venues} venues</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Scorers */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Top Scorers
        </h3>
        <div className="space-y-3">
          {topScorers.map((scorer, index) => (
            <div
              key={scorer.player}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-xs font-bold text-yellow-400">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {scorer.player}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <span>{scorer.country}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-bold text-white">{scorer.goals}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournament Stats */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-yellow-400" />
          Tournament Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Total Goals</span>
            <span className="text-sm font-medium text-white">172</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Average per Match</span>
            <span className="text-sm font-medium text-white">2.8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Yellow Cards</span>
            <span className="text-sm font-medium text-white">245</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Red Cards</span>
            <span className="text-sm font-medium text-white">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Total Attendance</span>
            <span className="text-sm font-medium text-white">3.2M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
