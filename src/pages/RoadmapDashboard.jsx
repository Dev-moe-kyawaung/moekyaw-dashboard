import { useState } from "react";
import { roadmapPhases } from "../data/dashboardData";

export default function RoadmapDashboard() {
  const [activeId, setActiveId] = useState("senior");
  const [expandAll, setExpandAll] = useState(false);

  const activePhase =
    roadmapPhases.find((phase) => phase.id === activeId) || roadmapPhases[1];

  return (
    <section className="dashboard-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">CAREER SYSTEM</span>
          <h1>Android Developer Roadmap</h1>
          <p>
            Intern → Junior → Mid → Senior → Lead → Principal → Architect
          </p>
        </div>

        <div className="header-score purple-score">
          <span>Current</span>
          <strong>Senior</strong>
        </div>
      </header>

      <article className="panel phase-selector">
        <span className="eyebrow">SELECT DEVELOPMENT PHASE</span>

        <div className="phase-selector-list">
          {roadmapPhases.map((phase) => (
            <button
              key={phase.id}
              className={activeId === phase.id ? "phase-button active" : "phase-button"}
              style={{ "--phase-color": phase.color }}
              onClick={() => setActiveId(phase.id)}
            >
              <span>{phase.icon}</span>
              <strong>{phase.title}</strong>
              <small>{phase.status}</small>
            </button>
          ))}
        </div>
      </article>

      <article
        className="panel active-phase"
        style={{
          borderColor: `${activePhase.color}88`,
          "--phase-color": activePhase.color,
        }}
      >
        <div className="active-phase-header">
          <div>
            <span className="eyebrow" style={{ color: activePhase.color }}>
              {activePhase.phase} • {activePhase.months}
            </span>
            <h2>{activePhase.title}</h2>
            <p className="burmese">{activePhase.burmese}</p>
            <p>{activePhase.description}</p>
          </div>

          <span className="phase-status">{activePhase.status}</span>
        </div>

        <div className="roadmap-topic-list">
          {activePhase.topics.map(([name, detail, progress]) => (
            <div className="roadmap-topic" key={name}>
              <div className="roadmap-topic-heading">
                <div>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </div>
                <span>{progress}%</span>
              </div>

              <div className="progress-track">
                <i style={{ width: `${progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel full-roadmap">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">FULL ROADMAP OVERVIEW</span>
            <h2>Long-term career progression</h2>
          </div>

          <button
            className="outline-button"
            onClick={() => setExpandAll((value) => !value)}
          >
            {expandAll ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className="vertical-roadmap">
          {roadmapPhases.map((phase) => (
            <div
              className={
                expandAll || phase.id === activeId
                  ? "vertical-phase open"
                  : "vertical-phase"
              }
              key={phase.id}
            >
              <button
                className="vertical-phase-header"
                onClick={() => setActiveId(phase.id)}
              >
                <span
                  className="vertical-node"
                  style={{
                    color: phase.color,
                    borderColor: phase.color,
                    background:
                      phase.status === "Future" ? "#07070f" : phase.color,
                  }}
                >
                  {phase.icon}
                </span>

                <div>
                  <strong>{phase.phase} • {phase.title}</strong>
                  <small>{phase.status} • {phase.months}</small>
                </div>
              </button>

              {(expandAll || phase.id === activeId) && (
                <div className="vertical-content">
                  <p>{phase.description}</p>
                  <span>{phase.topics.length} development areas</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
