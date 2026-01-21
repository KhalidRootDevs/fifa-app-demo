import { allMatches } from "@/lib/database/allMatches";
import Image from "next/image";
import Link from "next/link";

export function AllMatches() {
  return (
    <div className="bg-dark-secondary rounded-md p-4">
      <h2 className="flex items-center gap-2 text-lg font-medium">
        <span className="text-red-500">📺</span>
        All Matches
      </h2>

      <div className="mt-4 space-y-3">
        {allMatches.map((match) => (
          <div
            key={match.id}
            className="bg-dark rounded-md p-3 flex items-center"
          >
            <div className="flex-shrink-0">
              <span className="flex items-center text-xs text-red-500 font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                Live Now
              </span>
              <span className="text-xs text-gray-400 block mt-1">
                {match.league}
              </span>
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
  );
}
