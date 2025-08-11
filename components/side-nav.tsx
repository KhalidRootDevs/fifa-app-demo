"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Trophy, Star, Users, TrendingUp, Heart } from "lucide-react"

const leagues = [
  { id: "ucl", name: "UEFA Champions League", icon: "/icons/ucl.svg", matches: 16 },
  { id: "uel", name: "UEFA Europa League", icon: "/icons/uel.svg", matches: 12 },
  { id: "premier", name: "Premier League", icon: "/icons/premier.svg", matches: 10 },
  { id: "laliga", name: "La Liga", icon: "/icons/laliga.svg", matches: 9 },
  { id: "bundesliga", name: "Bundesliga", icon: "/icons/bundesliga.svg", matches: 9 },
  { id: "ligue1", name: "Ligue 1", icon: "/icons/ligue1.svg", matches: 10 },
  { id: "seriea", name: "Serie A", icon: "/icons/seriea.svg", matches: 10 },
]

const teams = [
  { id: "chelsea", name: "Chelsea", icon: "/icons/chelsea.svg", status: "playing" },
  { id: "manutd", name: "Manchester United", icon: "/icons/manutd.svg", status: "upcoming" },
  { id: "barcelona", name: "Barcelona", icon: "/icons/barcelona.svg", status: "playing" },
  { id: "mancity", name: "Manchester City", icon: "/icons/mancity.svg", status: "playing" },
  { id: "bayern", name: "Bayern München", icon: "/icons/bayern.svg", status: "playing" },
]

const sections = [
  {
    id: "leagues",
    title: "Top Leagues",
    icon: <Trophy className="w-4 h-4" />,
    items: leagues,
    itemRenderer: (league: any) => (
      <>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5">
            <Image
              src={league.icon || "/placeholder.svg"}
              alt={league.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-sm font-medium">{league.name}</span>
        </div>

        {league.matches > 0 && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400">{league.matches}</span>
        )}
      </>
    ),
  },
  {
    id: "teams",
    title: "Popular Teams",
    icon: <Star className="w-4 h-4" />,
    items: teams,
    itemRenderer: (team: any) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "playing":
            return "bg-green-500"
          case "upcoming":
            return "bg-yellow-500"
          default:
            return "bg-gray-500"
        }
      }

      return (
        <>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 relative">
              <Image
                src={team.icon || "/placeholder.svg"}
                alt={team.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              {team.status && (
                <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${getStatusColor(team.status)}`} />
              )}
            </div>
            <span className="text-sm font-medium">{team.name}</span>
          </div>

          {team.status === "playing" && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Live</span>
          )}
          {team.status === "upcoming" && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Soon</span>
          )}
        </>
      )
    },
  },
]

export function SideNav() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    leagues: true,
    teams: true,
  })

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">Join the community</h3>
            <p className="text-xs text-gray-400">Connect with other fans</p>
          </div>
        </div>
        <motion.button
          className="w-full gradient-bg text-white py-2 rounded-lg text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign Up Now
        </motion.button>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="glass-card rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center gap-2">
              <div className="gradient-bg w-6 h-6 rounded flex items-center justify-center">{section.icon}</div>
              <h3 className="font-medium">{section.title}</h3>
            </div>
            <motion.div animate={{ rotate: expandedSections[section.id] ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </div>

          <AnimatePresence>
            {expandedSections[section.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${section.id}/${item.id}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      {section.itemRenderer(item)}
                    </Link>
                  ))}
                  <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors mt-2 py-1">
                    View all
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-6 h-6 rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-medium">Trending</h3>
          </div>
          <button className="text-xs text-gray-400 hover:text-white transition-colors">Refresh</button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10">
              <Image
                src="/icons/liverpool.svg"
                alt="Liverpool"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Liverpool vs Man City</div>
              <div className="text-xs text-gray-400">Premier League • Tomorrow</div>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10">
              <Image
                src="/icons/barcelona.svg"
                alt="Barcelona"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Barcelona vs Real Madrid</div>
              <div className="text-xs text-gray-400">La Liga • Sunday</div>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
