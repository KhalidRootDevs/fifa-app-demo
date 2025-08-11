import { WorldCupSchedulePage } from "@/components/world-cup-schedule-page";

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span className="text-4xl">📅</span>
        World Cup Schedule
      </h1>

      <WorldCupSchedulePage />
    </div>
  );
}
