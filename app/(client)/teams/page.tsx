import { WorldCupTeamsPage } from "@/components/world-cup-teams-page";

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span className="text-4xl">⚽</span>
        World Cup Teams
      </h1>

      <WorldCupTeamsPage />
    </div>
  );
}
