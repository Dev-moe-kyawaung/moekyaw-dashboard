import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Target,
  Sparkles,
} from "lucide-react";
import { projectData, skillDomains, roadmapPhases } from "../data/dashboardData";

export default function Overview() {
  const tasks = projectData.tasks;

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const active = tasks.filter((task) => task.status === "In Progress").length;
  const completedMilestones = projectData.milestones.filter(
    (milestone) => milestone.done
  ).length;

  const progress = Math.round(
    tasks.reduce((total, task) => total + task.progress, 0) / tasks.length
  );

  return (
    <section className="dashboard-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">MOE KYAW AUNG • COMMAND CENTER</span>
          <h1>Professional Dashboard</h1>
          <p>
            A focused workspace for Android projects, engineering skills,
            roadmap progress, and credentials.
          </p>
        </div>

        <div className="live-indicator">
          <span />
          Live workspace
        </div>
      </header>

      <div className="stat-grid">
        <article className="stat-card cyan">
          <Target size={21} />
          <span>Overall Progress</span>
          <strong>{progress}%</strong>
          <div className="mini-progress">
            <i style={{ width: `${progress}%` }} />
          </div>
        </article>

        <article className="stat-card green">
          <CheckCircle2 size={21} />
          <span>Tasks Completed</span>
          <strong>
            {completed}/{tasks.length}
          </strong>
          <small>Delivery milestones</small>
        </article>

        <article className="stat-card pink">
          <Clock3 size={21} />
          <span>In Progress</span>
          <strong>{active}</strong>
          <small>Active development tasks</small>
        </article>

        <article className="stat-card purple">
          <Sparkles size={21} />
          <span>Skill Mastery</span>
          <strong>86%</strong>
          <small>Senior Android profile</small>
        </article>
      </div>

      <div className="overview-grid">
        <article className="panel featured-project">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">FEATURED PROJECT</span>
              <h2>{projectData.projectName}</h2>
            </div>
            <span className="version">{projectData.version}</span>
          </div>

          <p>{projectData.subtitle}</p>
          <strong className="burmese">{projectData.burmese}</strong>

          <div className="large-progress">
            <div className="progress-label">
              <span>Project delivery</span>
              <strong>{progress}%</strong>
            </div>
            <div className="progress-track">
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="panel-footer">
            <span>{projectData.location}</span>
            <Link to="/dashboard/project">
              View project <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>

        <article className="panel quick-panel">
          <span className="eyebrow">QUICK ACCESS</span>
          <h2>Workspace areas</h2>

          <div className="quick-links">
            <Link to="/dashboard/project">
              <FolderIcon />
              Project command center
              <ArrowUpRight size={15} />
            </Link>

            <Link to="/dashboard/skills">
              <BrainIcon />
              Android skill matrix
              <ArrowUpRight size={15} />
            </Link>

            <Link to="/dashboard/roadmap">
              <MapIcon />
              Career roadmap
              <ArrowUpRight size={15} />
            </Link>

            <Link to="/dashboard/certificate">
              <AwardIcon />
              Certificate presentation
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </article>
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">PROGRESS SNAPSHOT</span>
          <h2>Current development status</h2>
        </div>
        <span className="muted-text">
          {completedMilestones}/{projectData.milestones.length} milestones
        </span>
      </div>

      <div className="snapshot-grid">
        <article className="panel snapshot-panel">
          <div className="snapshot-title">
            <FolderIcon />
            <strong>Project delivery</strong>
          </div>

          {tasks.slice(0, 4).map((task) => (
            <div className="snapshot-row" key={task.id}>
              <span>{task.name}</span>
              <strong>{task.progress}%</strong>
            </div>
          ))}
        </article>

        <article className="panel snapshot-panel">
          <div className="snapshot-title">
            <BrainIcon />
            <strong>Core competencies</strong>
          </div>

          {skillDomains.slice(0, 4).map((skill) => (
            <div className="snapshot-row" key={skill.id}>
              <span>{skill.label}</span>
              <strong style={{ color: skill.color }}>{skill.score}%</strong>
            </div>
          ))}
        </article>

        <article className="panel snapshot-panel">
          <div className="snapshot-title">
            <MapIcon />
            <strong>Career direction</strong>
          </div>

          {roadmapPhases.slice(0, 4).map((phase) => (
            <div className="snapshot-row" key={phase.id}>
              <span>{phase.title}</span>
              <strong style={{ color: phase.color }}>{phase.status}</strong>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

function FolderIcon() {
  return <span className="inline-icon">▣</span>;
}

function BrainIcon() {
  return <span className="inline-icon">◈</span>;
}

function MapIcon() {
  return <span className="inline-icon">◇</span>;
}

function AwardIcon() {
  return <span className="inline-icon">✦</span>;
}
