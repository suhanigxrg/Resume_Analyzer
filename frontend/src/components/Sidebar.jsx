function Sidebar({ setActivePage }) {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
      
      <div>
        <h1 className="text-2xl font-bold text-green-600 mb-10">
          ResumeAI
        </h1>

        <ul className="space-y-3">
          <li
            onClick={() => setActivePage("dashboard")}
            className="p-3 rounded-lg hover:bg-green-50 cursor-pointer"
          >
            Dashboard
          </li>

          <li
            onClick={() => setActivePage("analyzer")}
            className="p-3 rounded-lg hover:bg-green-50 cursor-pointer"
          >
            Analyzer
          </li>

          <li 
            onClick={() => setActivePage("insights")}
            className="p-3 rounded-lg hover:bg-green-50 cursor-pointer"
          >
            Insights
          </li>
        </ul>
      </div>

      <div className="text-xs text-gray-400">
        Built with focus 🚀
      </div>
    </div>
  );
}

export default Sidebar;