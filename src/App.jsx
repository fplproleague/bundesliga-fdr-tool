import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, ChevronDown, RotateCcw, SlidersHorizontal, Table2 } from 'lucide-react';
import {
  TEAMS,
  FIXTURES,
  GW_COUNT,
  CURRENT_GW,
  SCALES,
  DEFAULT_SCALE_ID,
  convertRatings,
  formatRating,
  getDefaultRatings,
  getFixtureInfo,
  getRatingStyle,
  getScaleSteps,
  getTeamAvgDifficulty,
  snapToScale,
} from './constants';

const GW_NUMBERS = Array.from({ length: GW_COUNT }, (_, i) => i + 1);

const RATINGS_STORAGE_KEY = 'bundesliga-fdr-ratings';
const SCALE_STORAGE_KEY = 'bundesliga-fdr-scale';

function loadStoredScaleId() {
  try {
    const id = localStorage.getItem(SCALE_STORAGE_KEY);
    return id in SCALES ? id : DEFAULT_SCALE_ID;
  } catch {
    return DEFAULT_SCALE_ID;
  }
}

// Ratings saved before scales existed have no scale stored, so they load as 1-5, which they are.
function loadStoredRatings(scale) {
  const defaults = getDefaultRatings(scale);
  try {
    const raw = localStorage.getItem(RATINGS_STORAGE_KEY);
    if (!raw) return defaults;
    const stored = JSON.parse(raw);
    return Object.fromEntries(
      TEAMS.map(({ code }) => {
        const value = stored[code];
        return [code, Number.isFinite(value) ? snapToScale(value, scale) : defaults[code]];
      })
    );
  } catch {
    return defaults;
  }
}

function SectionToggle({ icon: Icon, title, isOpen, onToggle }) {
  return (
    <button type="button" className="panel-toggle" onClick={onToggle} aria-expanded={isOpen}>
      <h2 className="panel-title">
        <Icon size={18} aria-hidden="true" />
        {title}
      </h2>
      <ChevronDown size={18} aria-hidden="true" className={isOpen ? 'chevron chevron-open' : 'chevron'} />
    </button>
  );
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
  const [scaleId, setScaleId] = useState(loadStoredScaleId);
  const [ratings, setRatings] = useState(() => loadStoredRatings(SCALES[scaleId]));
  const [sortEasiest, setSortEasiest] = useState(false);
  const [gwStart, setGwStart] = useState(CURRENT_GW);
  const [gwEnd, setGwEnd] = useState(GW_COUNT);
  const [openSections, setOpenSections] = useState({ strength: false, table: true });

  const toggleSection = key => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

  const scale = SCALES[scaleId];

  useEffect(() => {
    try {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
      localStorage.setItem(SCALE_STORAGE_KEY, scaleId);
    } catch {
      // Private browsing / storage disabled — ratings just won't persist across reloads.
    }
  }, [ratings, scaleId]);

  const updateRating = (code, value) => {
    setRatings(prev => ({ ...prev, [code]: value }));
  };

  // Carries the current ratings over to the new scale instead of resetting them.
  const changeScale = newId => {
    setRatings(prev => convertRatings(prev, scale, SCALES[newId]));
    setScaleId(newId);
  };

  const defaultRatings = useMemo(() => getDefaultRatings(scale), [scale]);

  const resetRatings = () => setRatings(defaultRatings);

  const isCustom = TEAMS.some(t => ratings[t.code] !== defaultRatings[t.code]);

  const displayedTeams = useMemo(() => {
    if (!sortEasiest) return TEAMS;
    return [...TEAMS].sort(
      (a, b) =>
        getTeamAvgDifficulty(a.code, ratings, scale, gwStart, gwEnd) -
        getTeamAvgDifficulty(b.code, ratings, scale, gwStart, gwEnd)
    );
  }, [sortEasiest, ratings, scale, gwStart, gwEnd]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Bundesliga FDR</h1>
        <p className="app-subtitle">Fixture Difficulty Rating</p>
      </header>

      <main className="app-main">
        <section className="panel">
          <SectionToggle
            icon={SlidersHorizontal}
            title="Team Strength"
            isOpen={openSections.strength}
            onToggle={() => toggleSection('strength')}
          />
          {openSections.strength && (
            <div className="panel-body">
              <div className="panel-controls">
                <div className="gw-range">
                  <label htmlFor="scale">Scale</label>
                  <select
                    id="scale"
                    className="gw-select"
                    value={scaleId}
                    onChange={e => changeScale(e.target.value)}
                  >
                    {Object.values(SCALES).map(s => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
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
                  const style = getRatingStyle(rating, scale);
                  return (
                    <div className="strength-card" key={team.code}>
                      <div className="strength-card-top">
                        <span className="team-label">
                          <ClubLogo code={team.code} />
                          <span className="team-code">{team.code}</span>
                        </span>
                        <span className="rating-badge" style={{ background: style.bg, color: style.text }}>
                          {formatRating(rating, scale)}
                        </span>
                      </div>
                      <span className="team-name">{team.name}</span>
                      <input
                        type="range"
                        min={scale.min}
                        max={scale.max}
                        step={scale.step}
                        value={rating}
                        onChange={e => updateRating(team.code, Number(e.target.value))}
                        aria-label={`Strength of ${team.name}`}
                        className="strength-slider"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="panel">
          <SectionToggle
            icon={Table2}
            title="FDR Table"
            isOpen={openSections.table}
            onToggle={() => toggleSection('table')}
          />
          {openSections.table && (
            <div className="panel-body">
              <div className="panel-controls">
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
                          const { opp, venue, style } = getFixtureInfo(FIXTURES[team.code][gw - 1], ratings, scale);
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
                <span className="legend-end">Easiest</span>
                <div className="legend-steps">
                  {getScaleSteps(scale).map(r => {
                    const style = getRatingStyle(r, scale);
                    return (
                      <span className="legend-step" key={r} style={{ background: style.bg, color: style.text }}>
                        {formatRating(r, scale)}
                      </span>
                    );
                  })}
                </div>
                <span className="legend-end">Hardest</span>
              </div>
            </div>
          )}
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
