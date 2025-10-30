import { MatchDetails } from "@/components/match-details";

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default async function MatchPage({ params }: MatchPageProps) {
  const { id } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <MatchDetails matchId={id} />
    </div>
  );
}
