// Teams and fixtures for the Bundesliga FDR tool. Each fixture entry is an "OPP-VENUE" string
// (opponent code + H/A from the row team's perspective).

export const TEAMS = [
  { code: 'FCB', name: 'Bayern München' },
  { code: 'BVB', name: 'Borussia Dortmund' },
  { code: 'RBL', name: 'RB Leipzig' },
  { code: 'B04', name: 'Bayer Leverkusen' },
  { code: 'VFB', name: 'VfB Stuttgart' },
  { code: 'TSG', name: 'TSG Hoffenheim' },
  { code: 'SGE', name: 'Eintracht Frankfurt' },
  { code: 'SCF', name: 'SC Freiburg' },
  { code: 'KOE', name: '1. FC Köln' },
  { code: 'BMG', name: 'Borussia Mönchengladbach' },
  { code: 'FCA', name: 'FC Augsburg' },
  { code: 'M05', name: 'Mainz 05' },
  { code: 'HSV', name: 'Hamburger SV' },
  { code: 'S04', name: 'Schalke 04' },
  { code: 'FCU', name: 'Union Berlin' },
  { code: 'SVW', name: 'Werder Bremen' },
  { code: 'SCP', name: 'SC Paderborn' },
  { code: 'ELV', name: 'SV Elversberg' },
];

export const DEFAULT_RATINGS = {
  FCB: 5, BVB: 5, RBL: 5, B04: 5,
  VFB: 4, TSG: 4, SGE: 4, SCF: 4,
  KOE: 3, BMG: 3, FCA: 3, M05: 3, HSV: 3,
  S04: 2, FCU: 2, SVW: 2,
  SCP: 1, ELV: 1,
};

export const FIXTURES = {
  FCB: ['VFB-H', 'S04-A', 'ELV-A'],
  VFB: ['FCB-A', 'KOE-H', 'TSG-A'],
  RBL: ['BMG-H', 'SVW-A', 'HSV-H'],
  BMG: ['RBL-A', 'ELV-H', 'SCF-A'],
  M05: ['SCP-H', 'HSV-A', 'SGE-H'],
  SCP: ['M05-A', 'SCF-H', 'BVB-A'],
  KOE: ['TSG-H', 'VFB-A', 'SVW-H'],
  TSG: ['KOE-A', 'BVB-H', 'VFB-H'],
  FCU: ['SGE-H', 'B04-A', 'S04-H'],
  SGE: ['FCU-A', 'FCA-H', 'M05-A'],
  ELV: ['B04-H', 'BMG-A', 'FCB-H'],
  B04: ['ELV-A', 'FCU-H', 'FCA-A'],
  BVB: ['HSV-H', 'TSG-A', 'SCP-H'],
  HSV: ['BVB-A', 'M05-H', 'RBL-A'],
  SCF: ['SVW-H', 'SCP-A', 'BMG-H'],
  SVW: ['SCF-A', 'RBL-H', 'KOE-A'],
  FCA: ['S04-H', 'SGE-A', 'B04-H'],
  S04: ['FCA-A', 'FCB-H', 'FCU-A'],
};

export const GW_COUNT = 3;
export const GW_INDEXES = Array.from({ length: GW_COUNT }, (_, i) => i);

// Green (easy) through red (hard), same 1-5 scale as the strength rating itself.
export const RATING_STYLE = {
  1: { bg: '#3F9142', text: '#F2FBF2', label: 'Easiest' },
  2: { bg: '#8BB84A', text: '#12280A', label: 'Easy' },
  3: { bg: '#E0B93C', text: '#332400', label: 'Average' },
  4: { bg: '#DD7C31', text: '#2E1400', label: 'Hard' },
  5: { bg: '#C8102E', text: '#FFFFFF', label: 'Hardest' },
};

export function getTeamName(code) {
  return TEAMS.find(t => t.code === code)?.name ?? code;
}

export function getFixtureInfo(fixture, ratings) {
  const [opp, venue] = fixture.split('-');
  const rating = ratings[opp] ?? 3;
  return { opp, venue, style: RATING_STYLE[rating], rating };
}

export function getTeamAvgDifficulty(teamCode, ratings) {
  const fixtures = FIXTURES[teamCode];
  const total = fixtures.reduce((sum, f) => sum + getFixtureInfo(f, ratings).rating, 0);
  return total / fixtures.length;
}
