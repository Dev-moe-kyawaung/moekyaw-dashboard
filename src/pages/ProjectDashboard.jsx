import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { projectData } from "../data/dashboardData";

const filters = ["All", "Completed", "In Progress", "Not Started"];

const statusColor = {
  Completed: "#39ff14",
  "In Progress": "#00f5ff",
  "Not Started": "#4a4a65",
};

const priorityColor = {
  High: "#ff2d78",
  Medium: "#ffe600",
  Low: "#bf00ff",
};

export default function ProjectDashboard() {
  const [filter, setFilter] = useState("All");

  const tasks = projectData.tasks;

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const notStarted = tasks.filter((task) => task.status === "Not Started").length;

  const overall = Math.round(
    tasks.reduce((total, task) => total + task.progress, 0) / tasks.length
  );

  const chartData = tasks.map((task) => ({
    name: task.name.split(" ")[0],
    progress: task.progress,
  }));

  const pieData = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Not Started", value: notStarted },
  ];

  return (
    <section className="dashboard-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">PROJECT CONTROL CENTER</span>
          <h1>{projectData.projectName}</h1>
          <p>{projectData.subtitle}</p>
        </div>

        <div className="header-score">
          <span>Overall</span>
          <strong>{overall}%</strong>
        </div>
      </header>

      <div className="project-kpi-grid">
        <article className="panel project-kpi cyan-border">
          <span>Tasks total</span>
          <strong>{tasks.length}</strong>
        </article>

        <article className="panel project-kpi green-border">
          <span>Completed</span>
          <strong>{completed}</strong>
        </article>

        <article className="panel project-kpi yellow-border">
          <span>In progress</span>
          <strong>{inProgress}</strong>
        </article>

        <article className="panel project-kpi purple-border">
          <span>Milestones</span>
          <strong>
            {projectData.milestones.filter((item) => item.done).length}/
            {projectData.milestones.length}
          </strong>
        </article>
      </div>

      <div className="chart-grid">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">TASK PROGRESS</span>
              <h2>Delivery overview</h2>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#1d2037" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#777c9e" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#777c9e" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "#111122",
                  border: "1px solid #00f5ff55",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="progress" radius={[5, 5, 0, 0]}>
                {chartData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={
                      item.progress === 100
                        ? "#39ff14"
                        : item.progress > 0
                        ? "#00f5ff"
                        : "#33334c"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">STATUS SPLIT</span>
              <h2>Task distribution</h2>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="46%"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={4}
              >
                <Cell fill="#39ff14" />
                <Cell fill="#00f5ff" />
                <Cell fill="#33334c" />
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#111122",
                  border: "1px solid #ff2d7855",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ color: "#8b90b3", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </article>
      </div>

      <article className="panel task-panel">
        <div className="task-panel-header">
          <div>
            <span className="eyebrow">TASK MATRIX</span>
            <h2>Development tasks</h2>
          </div>

          <div className="filter-list">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "filter active" : "filter"}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <article className="task-item" key={task.id}>
              <div className="task-description">
                <div className="task-name">
                  <span
                    className="task-status-dot"
                    style={{ background: statusColor[task.status] }}
                  />
                  <strong>{task.name}</strong>
                  <small>{task.burmese}</small>
                </div>

                <div className="progress-track small">
                  <i
                    style={{
                      width: `${task.progress}%`,
                      background: statusColor[task.status],
                    }}
                  />
                </div>
              </div>

              <div className="task-details">
                <strong style={{ color: priorityColor[task.priority] }}>
                  {task.priority}
                </strong>
                <small>Due {task.deadline}</small>
                <span style={{ color: statusColor[task.status] }}>
                  {task.progress}%
                </span>
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="panel milestone-panel">
        <span className="eyebrow">MILESTONES</span>
        <h2>Project delivery timeline</h2>

        <div className="milestone-timeline">
          {projectData.milestones.map((milestone, index) => (
            <div
              className={milestone.done ? "milestone-item done" : "milestone-item"}
              key={milestone.name}
            >
              <div className="milestone-node">
                {milestone.done ? "✓" : index + 1}
              </div>
              <strong>{milestone.name}</strong>
              <small>{milestone.burmese}</small>
              <span>{milestone.date}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
