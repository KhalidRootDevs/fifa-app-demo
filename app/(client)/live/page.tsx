import { WorldCupLiveMatchesPage } from "@/components/world-cup-live-matches-page";

export default function LivePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
          FIFA World Cup 2026 - Live Matches
        </h1>
        <p className="text-gray-400 text-lg">
          Watch live matches from the biggest football tournament across USA,
          Canada & Mexico
        </p>
      </div>

      <WorldCupLiveMatchesPage />
    </div>
  );
}
