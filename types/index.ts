export interface Match {
  id: string;
  homeTeam: {
    name: string;
    flag: string;
    ranking: number;
  };
  awayTeam: {
    name: string;
    flag: string;
    ranking: number;
  };
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  phase: string;
  group?: string;
  status: "live" | "upcoming" | "completed";
  score?: {
    home: number;
    away: number;
  };
  viewers?: number;
  attendance?: number;
  temperature?: number;
  stats?: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    yellowCards: { home: number; away: number };
    redCards: { home: number; away: number };
  };
}
