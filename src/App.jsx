import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, RotateCcw, SlidersHorizontal, Table2 } from 'lucide-react';
import {
  TEAMS,
  DEFAULT_RATINGS,
  FIXTURES,
  RATING_STYLE,
  GW_COUNT,
  CURRENT_GW,
  getFixtureInfo,
  getTeamAvgDifficulty,
} from './constants';

const GW_NUMBERS = Array.from({ length: GW_COUNT }, (_, i) => i + 1);

const RATINGS_STORAGE_KEY = 'bundesliga-fdr-ratings';

function loadStoredRatings() {
  try {
    const raw = localStorage.getItem(RATINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_RATINGS;
    return { ...DEFAULT_RATINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_RATINGS;
  }
}

function ClubLogo({ code, size = 18 }) {
  return (
    <img
      src={`/club-logos/${code}.svg`}
      alt=""
      width={size}
      height={size}
      className="club-logo"
      onError={e => {
        e.target.style.display = 'none';
      }}
    />
  );
}

export default function App() {
  const [ratings, setRatings] = useState(loadStoredRatings);
  const [sortEasiest, setSortEasiest] = useState(false);
  const [gwStart, setGwStart] = useState(CURRENT_GW);
  const [gwEnd, setGwEnd] = useState(GW_COUNT);

  const changeGwStart = value => {
    setGwStart(value);
    setGwEnd(end => Math.max(end, value));
  };

  const changeGwEnd = value => {
    setGwEnd(value);
    setGwStart(start => Math.min(start, value));
  };

  const gwNumbers = useMemo(
    () => GW_NUMBERS.filter(gw => gw >= gwStart && gw <= gwEnd),
    [gwStart, gwEnd]
  );

  useEffect(() => {
    try {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
    } catch {
      // Private browsing / storage disabled — ratings just won't persist across reloads.
    }
  }, [ratings]);

  const updateRating = (code, value) => {
    setRatings(prev => ({ ...prev, [code]: value }));
  };

  const resetRatings = () => setRatings(DEFAULT_RATINGS);

  const isCustom = TEAMS.some(t => ratings[t.code] !== DEFAULT_RATINGS[t.code]);

  const displayedTeams = useMemo(() => {
    if (!sortEasiest) return TEAMS;
    return [...TEAMS].sort(
      (a, b) =>
        getTeamAvgDifficulty(a.code, ratings, gwStart, gwEnd) -
        getTeamAvgDifficulty(b.code, ratings, gwStart, gwEnd)
    );
  }, [sortEasiest, ratings, gwStart, gwEnd]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Bundesliga FDR</h1>
        <p className="app-subtitle">Fixture Difficulty Rating</p>
      </header>

      <main className="app-main">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <SlidersHorizontal size={18} aria-hidden="true" />
              Team Strength
            </h2>
            {isCustom && (
              <button type="button" className="reset-btn" onClick={resetRatings}>
                <RotateCcw size={14} aria-hidden="true" />
                Reset
              </button>
            )}
          </div>
          <div className="strength-grid">
            {TEAMS.map(team => {
              const rating = ratings[team.code];
              const style = RATING_STYLE[rating];
              return (
                <div className="strength-card" key={team.code}>
                  <div className="strength-card-top">
                    <span className="team-label">
                      <ClubLogo code={team.code} />
                      <span className="team-code">{team.code}</span>
                    </span>
                    <span className="rating-badge" style={{ background: style.bg, color: style.text }}>
                      {rating}
                    </span>
                  </div>
                  <span className="team-name">{team.name}</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={rating}
                    onChange={e => updateRating(team.code, Number(e.target.value))}
                    aria-label={`Strength of ${team.name}`}
                    className="strength-slider"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <Table2 size={18} aria-hidden="true" />
              FDR Table
            </h2>
            <div className="table-controls">
              <div className="gw-range">
                <label htmlFor="gw-start">GW</label>
                <select
                  id="gw-start"
                  className="gw-select"
                  value={gwStart}
                  onChange={e => changeGwStart(Number(e.target.value))}
                >
                  {GW_NUMBERS.map(gw => (
                    <option key={gw} value={gw}>
                      {gw}
                    </option>
                  ))}
                </select>
                <span>to</span>
                <select
                  id="gw-end"
                  className="gw-select"
                  value={gwEnd}
                  onChange={e => changeGwEnd(Number(e.target.value))}
                >
                  {GW_NUMBERS.map(gw => (
                    <option key={gw} value={gw}>
                      {gw}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="reset-btn"
                onClick={() => setSortEasiest(s => !s)}
                aria-pressed={sortEasiest}
              >
                <ArrowUpDown size={14} aria-hidden="true" />
                {sortEasiest ? 'Sorted: Easiest first' : 'Sort easiest first'}
              </button>
            </div>
          </div>
          <div className="fdr-table-scroll">
            <table className="fdr-table">
              <thead>
                <tr>
                  <th className="fdr-team-header">Team</th>
                  {gwNumbers.map(gw => (
                    <th key={gw}>GW{gw}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedTeams.map(team => (
                  <tr key={team.code}>
                    <td className="fdr-team-cell">
                      <span className="team-label">
                        <ClubLogo code={team.code} />
                        <span className="team-code">{team.code}</span>
                      </span>
                    </td>
                    {gwNumbers.map(gw => {
                      const { opp, venue, style } = getFixtureInfo(FIXTURES[team.code][gw - 1], ratings);
                      return (
                        <td key={gw} className="fdr-cell" style={{ background: style.bg, color: style.text }}>
                          {opp} <span className="fdr-venue">({venue})</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="legend">
            {[1, 2, 3, 4, 5].map(r => (
              <div className="legend-item" key={r}>
                <span className="legend-swatch" style={{ background: RATING_STYLE[r].bg }} />
                {RATING_STYLE[r].label}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <a
          href="https://x.com/fpl_proleague"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <img src="/x-logo.png" alt="" className="x-logo" />
          Made by @fpl_proleague
        </a>
      </footer>
    </div>
  );
}
