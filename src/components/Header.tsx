

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SecureDocs</h2>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            User{" "}
            <span className="text-sm text-gray-400">
              [ID: 101]
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
