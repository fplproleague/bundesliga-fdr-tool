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
  FCB: ['VFB-H', 'S04-A', 'ELV-A', 'FCU-H', 'FCA-A', 'RBL-H', 'SCF-A', 'BVB-A'],
  VFB: ['FCB-A', 'KOE-H', 'TSG-A', 'BVB-H', 'SCP-A', 'HSV-A', 'BMG-H', 'B04-A'],
  RBL: ['BMG-H', 'SVW-A', 'HSV-H', 'B04-A', 'SGE-H', 'FCB-A', 'ELV-H', 'S04-A'],
  BMG: ['RBL-A', 'ELV-H', 'SCF-A', 'M05-H', 'KOE-A', 'TSG-H', 'VFB-A', 'SCP-H'],
  M05: ['SCP-H', 'HSV-A', 'SGE-H', 'BMG-A', 'B04-H', 'S04-A', 'SVW-H', 'ELV-A'],
  SCP: ['M05-A', 'SCF-H', 'BVB-A', 'TSG-H', 'VFB-H', 'SVW-A', 'HSV-H', 'BMG-A'],
  KOE: ['TSG-H', 'VFB-A', 'SVW-H', 'HSV-A', 'BMG-H', 'SGE-A', 'S04-H', 'FCU-A'],
  TSG: ['KOE-A', 'BVB-H', 'VFB-H', 'SCP-A', 'HSV-H', 'BMG-A', 'B04-H', 'SVW-A'],
  FCU: ['SGE-H', 'B04-A', 'S04-H', 'FCB-A', 'ELV-H', 'BVB-H', 'FCA-A', 'KOE-H'],
  // RBL's GW5 entry says "Frankfurt (A)" — SGE's own GW5 entry also said away, which can't both be
  // true. Resolved here in SGE's favour of home, matching what RBL lists for that fixture.
  SGE: ['FCU-A', 'FCA-H', 'M05-A', 'SCF-H', 'RBL-A', 'KOE-H', 'BVB-A', 'HSV-H'],
  ELV: ['B04-H', 'BMG-A', 'FCB-H', 'S04-A', 'FCU-A', 'FCA-H', 'RBL-A', 'M05-H'],
  B04: ['ELV-A', 'FCU-H', 'FCA-A', 'RBL-H', 'M05-A', 'SCF-H', 'TSG-A', 'VFB-H'],
  BVB: ['HSV-H', 'TSG-A', 'SCP-H', 'VFB-A', 'SVW-H', 'FCU-A', 'SGE-H', 'FCB-H'],
  HSV: ['BVB-A', 'M05-H', 'RBL-A', 'KOE-H', 'TSG-A', 'VFB-H', 'SCP-A', 'SGE-A'],
  // Same conflict as SGE's GW5 above, but for GW7: FCB's own entry says "Freiburg (A)", so SCF is
  // resolved to home here to match.
  SCF: ['SVW-H', 'SCP-A', 'BMG-H', 'SGE-A', 'S04-H', 'B04-A', 'FCB-H', 'FCA-A'],
  SVW: ['SCF-A', 'RBL-H', 'KOE-A', 'FCA-H', 'BVB-A', 'SCP-H', 'M05-A', 'TSG-H'],
  FCA: ['S04-H', 'SGE-A', 'B04-H', 'SVW-A', 'FCB-H', 'ELV-A', 'FCU-H', 'SCF-H'],
  S04: ['FCA-A', 'FCB-H', 'FCU-A', 'ELV-H', 'SCF-A', 'M05-H', 'KOE-A', 'RBL-H'],
};

export const GW_COUNT = 8;
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
