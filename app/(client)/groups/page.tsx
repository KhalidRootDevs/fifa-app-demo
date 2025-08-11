import { WorldCupGroupsPage } from "@/components/world-cup-groups-page";

export default function GroupsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span className="text-4xl">🏆</span>
        World Cup Groups
      </h1>

      <WorldCupGroupsPage />
    </div>
  );
}
