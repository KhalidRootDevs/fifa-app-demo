"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Play, Bell } from "lucide-react";
import { scheduleData } from "@/lib/database/scheduleData";

const tournamentPhases = [
  { id: "all", name: "All Matches", color: "bg-blue-500" },
  { id: "group", name: "Group Stage", color: "bg-green-500" },
  { id: "round16", name: "Round of 16", color: "bg-yellow-500" },
  { id: "quarter", name: "Quarter Finals", color: "bg-orange-500" },
  { id: "semi", name: "Semi Finals", color: "bg-red-500" },
  { id: "final", name: "Final", color: "bg-purple-500" },
];

export function WorldCupSchedulePage() {
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique dates
  const availableDates = ["all", ...scheduleData.map((day) => day.date)];

  // Filter matches based on selected phase and date
  const filteredSchedule = scheduleData.filter((day) => {
    const phaseMatch = selectedPhase === "all" || day.phase === selectedPhase;
    const dateMatch = selectedDate === "all" || day.date === selectedDate;
    return phaseMatch && dateMatch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2026-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Phase Filter */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {tournamentPhases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPhase === phase.id
                      ? `${phase.color} text-white`
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {phase.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div className="lg:w-48">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
            >
              <option value="all" className="bg-gray-800">
                All Dates
              </option>
              {availableDates.slice(1).map((date) => (
                <option key={date} value={date} className="bg-gray-800">
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schedule */}
      {filteredSchedule.length > 0 ? (
        <div className="space-y-6">
          {filteredSchedule.map((day) => (
            <div
              key={day.date}
              className="glass-card rounded-xl overflow-hidden"
            >
              {/* Date Header */}
              <div className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-red-500" />
                      {formatDate(day.date)}
                    </h3>
                    <p className="text-sm text-gray-300 capitalize">
                      {day.phase === "group"
                        ? "Group Stage"
                        : day.phase.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-500">
                      {day.matches.length}
                    </div>
                    <div className="text-sm text-gray-400">Matches</div>
                  </div>
                </div>
              </div>

              {/* Matches */}
              <div className="divide-y divide-white/5">
                {day.matches.map((match) => (
                  <Link key={match.id} href={`/match/${match.id}`}>
                    <motion.div
                      className="p-6 hover:bg-white/5 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Time & Group */}
                        <div className="lg:w-32 text-center lg:text-left">
                          <div className="flex items-center gap-2 text-green-400 font-medium">
                            <Clock className="w-4 h-4" />
                            {formatTime(match.time)}
                          </div>
                          {match.group && (
                            <div className="text-sm text-gray-400">
                              Group {match.group}
                            </div>
                          )}
                        </div>

                        {/* Teams */}
                        <div className="flex-1 flex items-center justify-center gap-8">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Image
                                src={match.homeTeam.flag || "/placeholder.svg"}
                                alt={match.homeTeam.name}
                                width={28}
                                height={28}
                                className="w-7 h-7 object-cover rounded-full"
                              />
                            </div>
                            <span className="font-medium text-right">
                              {match.homeTeam.name}
                            </span>
                          </div>

                          <div className="text-xl font-bold text-gray-400">
                            VS
                          </div>

                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-medium">
                              {match.awayTeam.name}
                            </span>
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Image
                                src={match.awayTeam.flag || "/placeholder.svg"}
                                alt={match.awayTeam.name}
                                width={28}
                                height={28}
                                className="w-7 h-7 object-cover rounded-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Venue & Actions */}
                        <div className="lg:w-64 text-center lg:text-right">
                          <div className="flex items-center justify-center lg:justify-end gap-2 text-sm text-gray-300 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{match.stadium}</span>
                          </div>
                          <div className="text-xs text-gray-400 mb-3">
                            {match.city}
                          </div>

                          <div className="flex gap-2 justify-center lg:justify-end">
                            {match.status === "live" ? (
                              <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium">
                                <Play className="w-3 h-3" />
                                Watch Live
                              </button>
                            ) : (
                              <button className="flex items-center gap-1 bg-white/10 text-gray-300 hover:bg-white/20 px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                                <Bell className="w-3 h-3" />
                                Remind Me
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No matches found</h3>
          <p className="text-gray-400 mb-6">
            No matches found for the selected filters. Try adjusting your
            selection.
          </p>
          <button
            onClick={() => {
              setSelectedPhase("all");
              setSelectedDate("all");
            }}
            className="gradient-bg text-white px-6 py-2 rounded-lg font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Tournament Timeline */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Tournament Timeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournamentPhases.slice(1).map((phase) => (
            <div key={phase.id} className="bg-white/5 rounded-lg p-4">
              <div className={`w-4 h-4 ${phase.color} rounded-full mb-2`}></div>
              <h4 className="font-semibold mb-1">{phase.name}</h4>
              <p className="text-sm text-gray-400">
                {phase.id === "group" && "June 11 - June 27"}
                {phase.id === "round16" && "June 29 - July 3"}
                {phase.id === "quarter" && "July 5 - July 6"}
                {phase.id === "semi" && "July 9 - July 10"}
                {phase.id === "final" && "July 13"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
