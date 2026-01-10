import React from "react";

/* ---------- TYPES ---------- */

type Page = "login" | "dashboard" | "documents";

interface LoginProps {
  onLogin: () => void;
}

interface DashboardProps {
  currentPage: Page;
  onViewDocuments: () => void;
  onNavigate: (page: Page) => void;
}

interface SystemFilesProps {
  currentPage: Page;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

interface StatProps {
  title: string;
  value: string;
  subtitle?: string;
}

/* ---------- APP ---------- */

export default function App() {
  const [page, setPage] = React.useState<Page>("login");

  const handleNavigate = (newPage: Page) => setPage(newPage);

  return (
    <div className="min-h-screen bg-slate-50">
      {page === "login" && <Login onLogin={() => setPage("dashboard")} />}
      {(page === "dashboard" || page === "documents") && (
        <div className="flex h-screen">
          <Sidebar currentPage={page} onNavigate={handleNavigate} />

          <div className="flex-1 flex flex-col">
            <Header />

            <main className="flex-1 p-8 overflow-y-auto">
              {page === "dashboard" && (
                <Dashboard
                  currentPage={page}
                  onViewDocuments={() => setPage("documents")}
                  onNavigate={handleNavigate}
                />
              )}
              {page === "documents" && (
                <SystemFiles
                  currentPage={page}
                  onBack={() => setPage("dashboard")}
                  onNavigate={handleNavigate}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- LOGIN ---------- */

function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
            🔒
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email or Username"
            className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <button
            onClick={onLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition shadow-md"
          >
            Log in →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- HEADER ---------- */

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SecureDocs</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">User <span className="text-sm text-gray-400">[ID: 101]</span></span>
        </div>
      </div>
    </header>
  );
}

/* ---------- SIDEBAR ---------- */

function Sidebar({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (page: Page) => void }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600">SecureDocs</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavItem
          label="Dashboard"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
          active={currentPage === "dashboard"}
          onClick={() => onNavigate("dashboard")}
        />
        <NavItem
          label="My Documents"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          active={currentPage === "documents"}
          onClick={() => onNavigate("documents")}
        />
        <NavItem
          label="Upload Document"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
          active={false}
          onClick={() => {}}
        />
      </nav>

      <div className="p-6 border-t border-gray-200">
        <button className="text-red-600 hover:text-red-700 font-medium">Logout</button>
      </div>
    </aside>
  );
}

function NavItem({ label, icon, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
        active
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ---------- DASHBOARD ---------- */

function Dashboard({ onViewDocuments }: DashboardProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome, User <span className="text-lg text-gray-400">[ID: 101]</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your secure documents and profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Stat title="Total Documents" value="5" />
        <Stat title="Storage Used" value="124 MB" />
        <Stat title="Recent Uploads" value="2" subtitle="Last upload: 2 hours ago" />
      </div>

      <button
        onClick={onViewDocuments}
        className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
      >
        View All Documents
      </button>

      <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-700">File Name</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Date Uploaded</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Document ID</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: "Project Alpha Specs.pdf", date: "Oct 24, 2023", id: "1042" },
                { name: "Q4 Budget Draft.xlsx", date: "Oct 22, 2023", id: "1041" },
              ].map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-left">{doc.name}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4 text-center text-gray-600">ID: {doc.id}</td>
                  <td className="px-6 py-4 text-center">
                    <a href="#" className="text-blue-600 hover:underline font-medium">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

/* ---------- SYSTEM FILES ---------- */

function SystemFiles({ onBack }: SystemFilesProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Documents</h1>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-700">Doc ID</th>
                <th className="text-left px-6 py-4 font-medium text-gray-700">Document Name</th>
                <th className="text-left px-6 py-4 font-medium text-gray-700">Owner</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Upload Date</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: "105", name: "Q3_Financial_Report.pdf", owner: "finance_dept", date: "Oct 24, 2023" },
                { id: "106", name: "Employee_Salaries_2024.xlsx", owner: "hr_admin", date: "Oct 25, 2023" },
                { id: "107", name: "Confidential_Memo.docx", owner: "ceo_office", date: "Oct 26, 2023" },
              ].map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-left font-medium">#{doc.id}</td>
                  <td className="px-6 py-4 text-left">{doc.name}</td>
                  <td className="px-6 py-4 text-left text-gray-600">{doc.owner}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4 text-center">
                    <a href="#" className="text-blue-600 hover:underline font-medium">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ---------- SHARED ---------- */

function Stat({ title, value, subtitle }: StatProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-4xl font-bold text-gray-900 mt-2">{value}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-3">{subtitle}</p>}
    </div>
  );
}