import { LeagueDetails } from "@/components/league-details";

export default function LeagueDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <LeagueDetails leagueId={params.id} />
    </div>
  );
}
