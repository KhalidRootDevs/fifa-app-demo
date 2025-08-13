import Image from "next/image"
import Link from "next/link"

const allMatches = [
  {
    id: 1,
    homeTeam: { name: "Villarreal", logo: "/icons/villarreal.svg" },
    awayTeam: { name: "Espanyol", logo: "/icons/espanyol.svg" },
    score: "0 - 0",
    league: "La Liga",
    isLive: true,
  },
  {
    id: 2,
    homeTeam: { name: "Nantes", logo: "/icons/nantes.svg" },
    awayTeam: { name: "Toulouse", logo: "/icons/toulouse.svg" },
    score: "0 - 0",
    league: "Ligue 1",
    isLive: true,
  },
  {
    id: 3,
    homeTeam: { name: "Montpellier", logo: "/icons/montpellier.svg" },
    awayTeam: { name: "Reims", logo: "/icons/reims.svg" },
    score: "0 - 0",
    league: "Ligue 1",
    isLive: true,
  },
  {
    id: 4,
    homeTeam: { name: "Lens", logo: "/icons/lens.svg" },
    awayTeam: { name: "Auxerre", logo: "/icons/auxerre.svg" },
    score: "0 - 0",
    league: "Ligue 1",
    isLive: true,
  },
  {
    id: 5,
    homeTeam: { name: "Liverpool", logo: "/icons/liverpool.svg" },
    awayTeam: { name: "Tottenham", logo: "/icons/tottenham.svg" },
    score: "0 - 0",
    league: "Premier League",
    isLive: true,
  },
  {
    id: 6,
    homeTeam: { name: "Werder Bremen", logo: "/icons/bremen.svg" },
    awayTeam: { name: "FC St. Pauli", logo: "/icons/stpauli.svg" },
    score: "0 - 0",
    league: "Bundesliga",
    isLive: true,
  },
  {
    id: 7,
    homeTeam: { name: "Marseille", logo: "/icons/marseille.svg" },
    awayTeam: { name: "Stade Brestoix 29", logo: "/icons/brest.svg" },
    score: "0 - 0",
    league: "Ligue 1",
    isLive: true,
  },
  {
    id: 8,
    homeTeam: { name: "Bucaramanga", logo: "/icons/bucaramanga.svg" },
    awayTeam: { name: "Millonarios", logo: "/icons/millonarios.svg" },
    score: "0 - 0",
    league: "Primera A",
    isLive: true,
  },
]

export function AllMatches() {
  return (
    <div className="bg-dark-secondary rounded-md p-4">
      <h2 className="flex items-center gap-2 text-lg font-medium">
        <span className="text-red-500">📺</span>
        All Matches
      </h2>

      <div className="mt-4 space-y-3">
        {allMatches.map((match) => (
          <div key={match.id} className="bg-dark rounded-md p-3 flex items-center">
            <div className="flex-shrink-0">
              <span className="flex items-center text-xs text-red-500 font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                Live Now
              </span>
              <span className="text-xs text-gray-400 block mt-1">{match.league}</span>
            </div>

            <div className="flex-1 flex items-center justify-between mx-4">
              <div className="flex items-center gap-2">
                <Image
                  src={match.homeTeam.logo || "/placeholder.svg"}
                  alt={match.homeTeam.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm">{match.homeTeam.name}</span>
              </div>

              <span className="text-sm font-medium">{match.score}</span>

              <div className="flex items-center gap-2">
                <Image
                  src={match.awayTeam.logo || "/placeholder.svg"}
                  alt={match.awayTeam.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm">{match.awayTeam.name}</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href={`/watch/${match.id}`}
                className="text-xs text-red-500 border border-red-500 rounded px-3 py-1 inline-flex items-center gap-1 hover:bg-dark transition-colors"
              >
                Watch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
