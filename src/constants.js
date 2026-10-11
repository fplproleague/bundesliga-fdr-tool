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

// Full 2026-27 season, GW1-34. Each row is split at the halfway mark: GW1-17 on the first line,
// GW18-34 (the mirrored second half, venues flipped) on the second. GW6-34 come from the official
// Bundesliga fixture list; GW1-5 were entered by hand earlier and are consistent with it (every team
// plays every other team once home and once away).
export const FIXTURES = {
  FCB: [
    'VFB-H', 'S04-A', 'ELV-A', 'FCU-H', 'FCA-A', 'RBL-H', 'SCF-A', 'BVB-H', 'M05-A', 'KOE-H', 'HSV-A', 'SCP-H', 'TSG-A', 'SVW-H', 'BMG-A', 'B04-H', 'SGE-A',
    'VFB-A', 'S04-H', 'ELV-H', 'FCU-A', 'FCA-H', 'RBL-A', 'SCF-H', 'BVB-A', 'M05-H', 'KOE-A', 'HSV-H', 'SCP-A', 'TSG-H', 'SVW-A', 'BMG-H', 'B04-A', 'SGE-H',
  ],
  VFB: [
    'FCB-A', 'KOE-H', 'TSG-A', 'BVB-H', 'SCP-A', 'HSV-A', 'BMG-H', 'B04-A', 'SVW-H', 'S04-A', 'SGE-H', 'ELV-A', 'FCU-H', 'SCF-A', 'FCA-H', 'RBL-A', 'M05-H',
    'FCB-H', 'KOE-A', 'TSG-H', 'BVB-A', 'SCP-H', 'HSV-H', 'BMG-A', 'B04-H', 'SVW-A', 'S04-H', 'SGE-A', 'ELV-H', 'FCU-A', 'SCF-H', 'FCA-A', 'RBL-H', 'M05-A',
  ],
  RBL: [
    'BMG-H', 'SVW-A', 'HSV-H', 'B04-A', 'SGE-H', 'FCB-A', 'ELV-H', 'S04-A', 'FCA-H', 'FCU-A', 'SCF-A', 'M05-H', 'KOE-A', 'BVB-H', 'SCP-A', 'VFB-H', 'TSG-A',
    'BMG-A', 'SVW-H', 'HSV-A', 'B04-H', 'SGE-A', 'FCB-H', 'ELV-A', 'S04-H', 'FCA-A', 'FCU-H', 'SCF-H', 'M05-A', 'KOE-H', 'BVB-A', 'SCP-H', 'VFB-A', 'TSG-H',
  ],
  BMG: [
    'RBL-A', 'ELV-H', 'SCF-A', 'M05-H', 'KOE-A', 'TSG-H', 'VFB-A', 'SCP-H', 'HSV-A', 'BVB-H', 'SVW-A', 'B04-A', 'SGE-H', 'S04-A', 'FCB-H', 'FCA-A', 'FCU-H',
    'RBL-H', 'ELV-A', 'SCF-H', 'M05-A', 'KOE-H', 'TSG-A', 'VFB-H', 'SCP-A', 'HSV-H', 'BVB-A', 'SVW-H', 'B04-H', 'SGE-A', 'S04-H', 'FCB-A', 'FCA-H', 'FCU-A',
  ],
  M05: [
    'SCP-H', 'HSV-A', 'SGE-H', 'BMG-A', 'B04-H', 'S04-A', 'SVW-H', 'ELV-A', 'FCB-H', 'FCA-A', 'FCU-H', 'RBL-A', 'SCF-H', 'KOE-H', 'BVB-A', 'TSG-H', 'VFB-A',
    'SCP-A', 'HSV-H', 'SGE-A', 'BMG-H', 'B04-A', 'S04-H', 'SVW-A', 'ELV-H', 'FCB-A', 'FCA-H', 'FCU-A', 'RBL-H', 'SCF-A', 'KOE-A', 'BVB-H', 'TSG-A', 'VFB-H',
  ],
  SCP: [
    'M05-A', 'SCF-H', 'BVB-A', 'TSG-H', 'VFB-H', 'SVW-A', 'HSV-H', 'BMG-A', 'SGE-H', 'B04-A', 'S04-H', 'FCB-A', 'ELV-H', 'FCA-A', 'RBL-H', 'FCU-A', 'KOE-H',
    'M05-H', 'SCF-A', 'BVB-H', 'TSG-A', 'VFB-A', 'SVW-H', 'HSV-A', 'BMG-H', 'SGE-A', 'B04-H', 'S04-A', 'FCB-H', 'ELV-A', 'FCA-H', 'RBL-A', 'FCU-H', 'KOE-A',
  ],
  KOE: [
    'TSG-H', 'VFB-A', 'SVW-H', 'HSV-A', 'BMG-H', 'SGE-A', 'S04-H', 'FCU-A', 'B04-H', 'FCB-A', 'ELV-H', 'FCA-A', 'RBL-H', 'M05-A', 'SCF-H', 'BVB-H', 'SCP-A',
    'TSG-A', 'VFB-H', 'SVW-A', 'HSV-H', 'BMG-A', 'SGE-H', 'S04-A', 'FCU-H', 'B04-A', 'FCB-H', 'ELV-A', 'FCA-H', 'RBL-A', 'M05-H', 'SCF-A', 'BVB-A', 'SCP-H',
  ],
  TSG: [
    'KOE-A', 'BVB-H', 'VFB-H', 'SCP-A', 'HSV-H', 'BMG-A', 'B04-H', 'SVW-A', 'S04-H', 'SGE-A', 'FCA-H', 'SCF-A', 'FCB-H', 'FCU-A', 'ELV-H', 'M05-A', 'RBL-H',
    'KOE-H', 'BVB-A', 'VFB-A', 'SCP-H', 'HSV-A', 'BMG-H', 'B04-A', 'SVW-H', 'S04-A', 'SGE-H', 'FCA-A', 'SCF-H', 'FCB-A', 'FCU-H', 'ELV-A', 'M05-H', 'RBL-A',
  ],
  FCU: [
    'SGE-H', 'B04-A', 'S04-H', 'FCB-A', 'ELV-H', 'BVB-H', 'FCA-A', 'KOE-H', 'SCF-A', 'RBL-H', 'M05-A', 'HSV-H', 'VFB-A', 'TSG-H', 'SVW-A', 'SCP-H', 'BMG-A',
    'SGE-A', 'B04-H', 'S04-A', 'FCB-H', 'ELV-A', 'BVB-A', 'FCA-H', 'KOE-A', 'SCF-H', 'RBL-A', 'M05-H', 'HSV-A', 'VFB-H', 'TSG-A', 'SVW-H', 'SCP-A', 'BMG-H',
  ],
  SGE: [
    'FCU-A', 'FCA-H', 'M05-A', 'SCF-H', 'RBL-A', 'KOE-H', 'BVB-A', 'HSV-H', 'SCP-A', 'TSG-H', 'VFB-A', 'SVW-H', 'BMG-A', 'B04-A', 'S04-H', 'ELV-A', 'FCB-H',
    'FCU-H', 'FCA-A', 'M05-H', 'SCF-A', 'RBL-H', 'KOE-A', 'BVB-H', 'HSV-A', 'SCP-H', 'TSG-A', 'VFB-H', 'SVW-A', 'BMG-H', 'B04-H', 'S04-A', 'ELV-H', 'FCB-A',
  ],
  ELV: [
    'B04-H', 'BMG-A', 'FCB-H', 'S04-A', 'FCU-A', 'FCA-H', 'RBL-A', 'M05-H', 'BVB-A', 'SCF-H', 'KOE-A', 'VFB-H', 'SCP-A', 'HSV-H', 'TSG-A', 'SGE-H', 'SVW-A',
    'B04-A', 'BMG-H', 'FCB-A', 'S04-H', 'FCU-H', 'FCA-A', 'RBL-H', 'M05-A', 'BVB-H', 'SCF-A', 'KOE-H', 'VFB-A', 'SCP-H', 'HSV-A', 'TSG-H', 'SGE-A', 'SVW-H',
  ],
  B04: [
    'ELV-A', 'FCU-H', 'FCA-A', 'RBL-H', 'M05-A', 'SCF-H', 'TSG-A', 'VFB-H', 'KOE-A', 'SCP-H', 'BVB-A', 'BMG-H', 'SVW-A', 'SGE-H', 'HSV-A', 'FCB-A', 'S04-H',
    'ELV-H', 'FCU-A', 'FCA-H', 'RBL-A', 'M05-H', 'SCF-A', 'TSG-H', 'VFB-A', 'KOE-H', 'SCP-A', 'BVB-H', 'BMG-A', 'SVW-H', 'SGE-A', 'HSV-H', 'FCB-H', 'S04-A',
  ],
  BVB: [
    'HSV-H', 'TSG-A', 'SCP-H', 'VFB-A', 'SVW-H', 'FCU-A', 'SGE-H', 'FCB-A', 'ELV-H', 'BMG-A', 'B04-H', 'S04-A', 'FCA-H', 'RBL-A', 'M05-H', 'KOE-A', 'SCF-H',
    'HSV-A', 'TSG-H', 'SCP-A', 'VFB-H', 'SVW-A', 'FCU-H', 'SGE-A', 'FCB-H', 'ELV-A', 'BMG-H', 'B04-A', 'S04-H', 'FCA-A', 'RBL-H', 'M05-A', 'KOE-H', 'SCF-A',
  ],
  HSV: [
    'BVB-A', 'M05-H', 'RBL-A', 'KOE-H', 'TSG-A', 'VFB-H', 'SCP-A', 'SGE-A', 'BMG-H', 'SVW-A', 'FCB-H', 'FCU-A', 'S04-H', 'ELV-A', 'B04-H', 'SCF-A', 'FCA-H',
    'BVB-H', 'M05-A', 'RBL-H', 'KOE-A', 'TSG-H', 'VFB-A', 'SCP-H', 'SGE-H', 'BMG-A', 'SVW-H', 'FCB-A', 'FCU-H', 'S04-A', 'ELV-H', 'B04-A', 'SCF-H', 'FCA-A',
  ],
  SCF: [
    'SVW-H', 'SCP-A', 'BMG-H', 'SGE-A', 'S04-H', 'B04-A', 'FCB-H', 'FCA-A', 'FCU-H', 'ELV-A', 'RBL-H', 'TSG-H', 'M05-A', 'VFB-H', 'KOE-A', 'HSV-H', 'BVB-A',
    'SVW-A', 'SCP-H', 'BMG-A', 'SGE-H', 'S04-A', 'B04-H', 'FCB-A', 'FCA-H', 'FCU-A', 'ELV-H', 'RBL-A', 'TSG-A', 'M05-H', 'VFB-A', 'KOE-H', 'HSV-A', 'BVB-H',
  ],
  SVW: [
    'SCF-A', 'RBL-H', 'KOE-A', 'FCA-H', 'BVB-A', 'SCP-H', 'M05-A', 'TSG-H', 'VFB-A', 'HSV-H', 'BMG-H', 'SGE-A', 'B04-H', 'FCB-A', 'FCU-H', 'S04-A', 'ELV-H',
    'SCF-H', 'RBL-A', 'KOE-H', 'FCA-A', 'BVB-H', 'SCP-A', 'M05-H', 'TSG-A', 'VFB-H', 'HSV-A', 'BMG-A', 'SGE-H', 'B04-A', 'FCB-H', 'FCU-A', 'S04-H', 'ELV-A',
  ],
  FCA: [
    'S04-H', 'SGE-A', 'B04-H', 'SVW-A', 'FCB-H', 'ELV-A', 'FCU-H', 'SCF-H', 'RBL-A', 'M05-H', 'TSG-A', 'KOE-H', 'BVB-A', 'SCP-H', 'VFB-A', 'BMG-H', 'HSV-A',
    'S04-A', 'SGE-H', 'B04-A', 'SVW-H', 'FCB-A', 'ELV-H', 'FCU-A', 'SCF-A', 'RBL-H', 'M05-A', 'TSG-H', 'KOE-A', 'BVB-H', 'SCP-A', 'VFB-H', 'BMG-A', 'HSV-H',
  ],
  S04: [
    'FCA-A', 'FCB-H', 'FCU-A', 'ELV-H', 'SCF-A', 'M05-H', 'KOE-A', 'RBL-H', 'TSG-A', 'VFB-H', 'SCP-A', 'BVB-H', 'HSV-A', 'BMG-H', 'SGE-A', 'SVW-H', 'B04-A',
    'FCA-H', 'FCB-A', 'FCU-H', 'ELV-A', 'SCF-H', 'M05-A', 'KOE-H', 'RBL-A', 'TSG-H', 'VFB-A', 'SCP-H', 'BVB-A', 'HSV-H', 'BMG-A', 'SGE-H', 'SVW-A', 'B04-H',
  ],
};

export const GW_COUNT = 34;
export const GW_INDEXES = Array.from({ length: GW_COUNT }, (_, i) => i);

// Last day of each gameweek's window (German time), from the official fixture list. GW1-5 were
// already played when this was added, so they're left out. From GW12 on these are provisional
// weekend/midweek windows; update them if the DFL moves a round.
const GW_END_DATES = {
  6: '2026-10-18', 7: '2026-10-25', 8: '2026-11-01', 9: '2026-11-08', 10: '2026-11-22',
  11: '2026-11-29', 12: '2026-12-06', 13: '2026-12-13', 14: '2026-12-20', 15: '2027-01-10',
  16: '2027-01-14', 17: '2027-01-17', 18: '2027-01-24', 19: '2027-01-31', 20: '2027-02-07',
  21: '2027-02-14', 22: '2027-02-21', 23: '2027-02-28', 24: '2027-03-04', 25: '2027-03-07',
  26: '2027-03-14', 27: '2027-03-21', 28: '2027-04-04', 29: '2027-04-11', 30: '2027-04-18',
  31: '2027-04-25', 32: '2027-05-09', 33: '2027-05-16', 34: '2027-05-22',
};

// Today's date as YYYY-MM-DD in German time, so the switch happens at midnight in Germany no
// matter where the viewer is.
function getGermanDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = type => parts.find(p => p.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

// The gameweek in progress or next up: the first one whose window hasn't ended yet. It moves on
// the day after a gameweek's last match day, and stays on GW34 once the season is over.
export function getCurrentGw(today = getGermanDate()) {
  const gw = Object.keys(GW_END_DATES)
    .map(Number)
    .find(n => today <= GW_END_DATES[n]);
  return gw ?? GW_COUNT;
}

// Sets the table's default range: from here to GW34 (see App.jsx).
export const CURRENT_GW = getCurrentGw();

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

export function getTeamAvgDifficulty(teamCode, ratings, startGw = 1, endGw = GW_COUNT) {
  const fixtures = FIXTURES[teamCode].slice(startGw - 1, endGw);
  const total = fixtures.reduce((sum, f) => sum + getFixtureInfo(f, ratings).rating, 0);
  return total / fixtures.length;
}
