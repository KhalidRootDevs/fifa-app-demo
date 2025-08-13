import type { Metadata } from "next";
import { WorldCupMatchesPage } from "@/components/world-cup-matches-page";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 - All Tournament Matches | Live Streaming",
  description:
    "Watch all FIFA World Cup 2026 matches live. Complete tournament schedule, group stage through final, featuring all 48 teams across USA, Canada, and Mexico.",
};

export default function MatchesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=32&width=32&text=🇺🇸"
              alt="USA"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=32&width=32&text=🇨🇦"
              alt="Canada"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=32&width=32&text=🇲🇽"
              alt="Mexico"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          FIFA World Cup 2026
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          All Tournament Matches - Complete schedule from group stage through
          the final across USA, Canada, and Mexico
        </p>
      </div>
      <WorldCupMatchesPage />
    </div>
  );
}
