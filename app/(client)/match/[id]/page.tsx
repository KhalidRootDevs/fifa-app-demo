import { MatchDetails } from "@/components/match-details";

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default function MatchPage({ params }: MatchPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <MatchDetails matchId={params.id} />
    </div>
  );
}
