import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Landing from "./pages/Landing";
import Insights from "./pages/Insights";
import Login from "./pages/Login";

function App() {
  const [activePage, setActivePage] = useState("landing");
  const [lastResult, setLastResult] = useState(null);
  const [user, setUser] = useState(null);

  // 🔥 LANDING PAGE (no layout)
  if (activePage === "landing") {
    return <Landing setActivePage={setActivePage} />;
  }

  // 🔥 LOGIN PAGE (no sidebar/topbar)
  if (activePage === "login") {
    return (
      <Login
        setUser={setUser}
        setActivePage={setActivePage}
      />
    );
  }

  // 🔥 MAIN APP (after login)
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar setActivePage={setActivePage} />

      <div className="flex-1 p-6">
        
       <Topbar 
  user={user} 
  setUser={setUser} 
  setActivePage={setActivePage} 
/>

        {activePage === "dashboard" && (
          <Dashboard
            lastResult={lastResult}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "analyzer" && (
  user ? (
    <Analyzer setLastResult={setLastResult} />
  ) : (
    <div className="text-center mt-20">
      <p className="text-gray-500 mb-4">
        Please login to analyze your resume
      </p>
      <button
        onClick={() => setActivePage("login")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Go to Login
      </button>
    </div>
  )
)}

        {activePage === "insights" && (
          <Insights result={lastResult} />
        )}
      </div>

    </div>
  );
}

export default App;