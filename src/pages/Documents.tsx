import { useEffect, useState } from "react";
import axios from "axios";

interface Document {
  id: number;
  title: string;
  filename: string;
  uploaded_at: string;
}

export default function Documents() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Not authenticated");
          return;
        }

        const res = await axios.get(
          "http://localhost:3000/docs/documents",
          {
            headers: {
              auth: token, // backend expects this
            },
            withCredentials: true,
          }
        );

        // 🔹 controller returns { documents: [...] }
        setDocs(res.data.documents);
      } catch (err: any) {
        console.error("Fetch documents error:", err);
        setError(
          err.response?.data?.error || "Failed to load documents"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);



  //code to download docuements when use clicks on view
  const handleDownload = async (doc: Document) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Not authenticated");
      //return;
    }

    const response = await axios.get(
      `http://localhost:3000/docs/download/${doc.id}`,
      {
        headers: {
          auth: token, // matches backend auth middleware
        },
        responseType: "blob", // 🔑 IMPORTANT
      }
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", doc.filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download document");
  }
};






  if (loading) {
    return <p className="text-center mt-10">Loading documents...</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">My Documents</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {docs.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Filename</th>
                <th className="text-center px-6 py-4">Uploaded</th>
                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {doc.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {doc.filename}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {new Date(doc.uploaded_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={ () => handleDownload(doc) } className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
