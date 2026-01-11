import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadDocument() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Not authenticated");
      }

      const formData = new FormData();
      formData.append("document", file);
      if (title) {
        formData.append("title", title);
      }

      await axios.post("http://localhost:3000/docs/upload", formData, {
        headers: {
          auth: token, // matches your auth middleware
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Document uploaded successfully");

      // redirect after short delay
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Upload failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Upload Document
      </h1>
      <p className="text-gray-600 mb-8">
        Upload a new document to your secure storage
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="rounded-lg bg-green-50 text-green-600 px-4 py-3 text-sm">
            {success}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Title (optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Project Proposal"
            className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
