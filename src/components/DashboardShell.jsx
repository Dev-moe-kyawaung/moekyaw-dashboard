import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BrainCircuit,
  Map,
  Award,
  ExternalLink,
} from "lucide-react";

const navigation = [
  {
    path: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    path: "/dashboard/project",
    label: "Project",
    icon: FolderKanban,
  },
  {
    path: "/dashboard/skills",
    label: "Skill Matrix",
    icon: BrainCircuit,
  },
  {
    path: "/dashboard/roadmap",
    label: "Roadmap",
    icon: Map,
  },
  {
    path: "/dashboard/certificate",
    label: "Certificate",
    icon: Award,
  },
];

export default function DashboardShell() {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="brand">
          <div className="brand-logo">MK</div>
          <div>
            <strong>Moe Kyaw Aung</strong>
            <small>Dashboard Suite</small>
          </div>
        </div>

        <div className="sidebar-label">NAVIGATION</div>

        <nav className="dashboard-navigation">
          {navigation.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                isActive ? "dashboard-link active" : "dashboard-link"
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-card">
            <span className="online-dot" />
            <div>
              <strong>System online</strong>
              <small>Dashboard ready</small>
            </div>
          </div>

          <a
            className="portfolio-link"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
            Portfolio link
          </a>
        </div>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
