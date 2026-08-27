import { useState } from 'react';
import { RotateCcw, SlidersHorizontal, Table2 } from 'lucide-react';
import { TEAMS, DEFAULT_RATINGS, FIXTURES, RATING_STYLE, GW_INDEXES, getFixtureInfo } from './constants';

export default function App() {
  const [ratings, setRatings] = useState(DEFAULT_RATINGS);

  const updateRating = (code, value) => {
    setRatings(prev => ({ ...prev, [code]: value }));
  };

  const resetRatings = () => setRatings(DEFAULT_RATINGS);

  const isCustom = TEAMS.some(t => ratings[t.code] !== DEFAULT_RATINGS[t.code]);

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
              Teamsterkte
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
                    <span className="team-code">{team.code}</span>
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
                    aria-label={`Sterkte van ${team.name}`}
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
              FDR Tabel
            </h2>
          </div>
          <div className="fdr-table-scroll">
            <table className="fdr-table">
              <thead>
                <tr>
                  <th className="fdr-team-header">Team</th>
                  {GW_INDEXES.map(i => (
                    <th key={i}>GW{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEAMS.map(team => (
                  <tr key={team.code}>
                    <td className="fdr-team-cell">{team.code}</td>
                    {FIXTURES[team.code].map((fixture, i) => {
                      const { opp, venue, style } = getFixtureInfo(fixture, ratings);
                      return (
                        <td key={i} className="fdr-cell" style={{ background: style.bg, color: style.text }}>
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
    </div>
  );
}
