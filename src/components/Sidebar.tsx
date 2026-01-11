import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <nav className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "block p-3 bg-blue-100 rounded"
              : "block p-3 hover:bg-gray-100 rounded"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) =>
            isActive
              ? "block p-3 bg-blue-100 rounded"
              : "block p-3 hover:bg-gray-100 rounded"
          }
        >
          My Documents
        </NavLink>
      </nav>
    </aside>
  );
}
