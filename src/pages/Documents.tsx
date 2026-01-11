import { useEffect, useState } from "react";

interface Document {
  id: number;
  title: string;
  owner: string;
}

export default function Documents() {
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    // 🔜 Replace with real API call
    fetch("/api/documents")
      .then((res) => res.json())
      .then(setDocs);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            {doc.title} (ID: {doc.id})
          </li>
        ))}
      </ul>
    </>
  );
}
