import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ---------- STAT COMPONENT ---------- */
function Stat({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-4xl font-bold text-gray-900 mt-2">{value}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-3">{subtitle}</p>}
    </div>
  );
}

/* ---------- DASHBOARD PAGE ---------- */
export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("authToken"); // or use cookie
        const userId = localStorage.getItem("userId"); // or use cookie
        setUserId(userId);


        const { data } = await axios.get("http://localhost:3000/docs/dashboard", {
          headers: {
            auth: `${token}`, // matches your auth middleware
          },
        });

        setUser(data.user);

        // Stats
        setStats({
          totalDocuments: data.stats.total_documents,
          storageUsed: data.stats.storage_used || "0 MB", // optional, placeholder
          recentUploads: data.recentActivity || [],
        });


        // Recent documents: get last 5 uploaded by user
        const recentDocs = await axios.get(`http://localhost:3000/docs/dashboard`, {
          headers: {
            auth: `${token}`,
          },
        });


        setRecentActivity(recentDocs.data.documents || []);

      } catch (err: any) {
        const message = err.response?.data?.error || err.message || "Failed to load dashboard";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleViewDocuments = () => navigate("/documents");
  const handleUploadDocument = () => navigate("/upload");
  

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div>
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome, {user.username} <span className="text-lg text-gray-400">ID: {userId}</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your secure documents and profile.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Stat title="Total Documents" value={stats.totalDocuments.toString()} />
        <Stat title="Storage Used" value={stats.storageUsed} />
        <Stat
          title="Recent Uploads"
          value={stats.recentUploads.length.toString()}
          subtitle={`Last upload: ${stats.recentUploads[0]?.uploaded_at || "N/A"}`}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={handleViewDocuments}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
        >
          View All Documents
        </button>
        <button
          onClick={handleUploadDocument}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
        >
          Upload Document
        </button>
      </div>

      {/* Recent Activity Table */}
      <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-700">File Name</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Upload Date</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Document ID</th>
                <th className="text-center px-6 py-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivity.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-left">{doc.filename || doc.title}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{new Date(doc.uploaded_at).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{doc.id}</td>
                  <td className="px-6 py-4 text-center">
                    <a href="#" className="text-blue-600 hover:underline font-medium">View</a>
                  </td>
                </tr>
              ))}
              {recentActivity.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
