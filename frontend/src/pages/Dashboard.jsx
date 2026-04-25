  import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ lastResult, setActivePage }) {


const [history, setHistory] = useState([]);

useEffect(() => {
  const fetchHistory = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.get(
      `http://localhost:5000/user/${user._id}`
    );

    setHistory(res.data.history);
  };

  fetchHistory();
}, []);


  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + item.result.score, 0) /
            history.length
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">
          Welcome 👋
        </h1>
        <p className="text-sm opacity-90">
          Track and improve your resume step by step.
        </p>

        <button
          onClick={() => setActivePage("analyzer")}
          className="mt-4 bg-white text-green-600 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          Analyze New Resume →
        </button>
      </div>

      {/* 🔥 MAIN STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Average Score</p>
          <h2 className="text-2xl font-bold text-green-600">
            {avgScore}%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Total Analyses</p>
          <h2 className="text-2xl font-bold">
            {history.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Latest Score</p>
          <h2 className="text-2xl font-bold">
            {lastResult?.score || 0}%
          </h2>
        </div>

      </div>

      {/* 🔥 CURRENT STATUS */}
      {lastResult && (
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-semibold mb-4">Current Resume Status</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Score Progress</p>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{ width: `${lastResult.score}%` }}
              ></div>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {lastResult.score < 50
              ? "Your resume needs major improvement."
              : lastResult.score < 75
              ? "You're on the right track, but can improve."
              : "Strong resume! Just polish it further."}
          </p>
        </div>
      )}

      {/* 🔥 QUICK ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6">

        <div
          onClick={() => setActivePage("analyzer")}
          className="bg-white p-5 rounded-xl border cursor-pointer hover:shadow-md transition"
        >
          <h3 className="font-semibold mb-2">Analyze Resume</h3>
          <p className="text-sm text-gray-500">
            Check a new resume or update your current one.
          </p>
        </div>

        <div
          onClick={() => setActivePage("insights")}
          className="bg-white p-5 rounded-xl border cursor-pointer hover:shadow-md transition"
        >
          <h3 className="font-semibold mb-2">View Insights</h3>
          <p className="text-sm text-gray-500">
            Understand your strengths and weaknesses.
          </p>
        </div>

      </div>

      {/* 🔥 RECENT ACTIVITY */}
      <div className="bg-white p-5 rounded-xl border">
        <h2 className="font-semibold mb-4">Recent Analyses</h2>

        {history.length === 0 && (
  <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
    <p>No resume analyzed yet</p>
    <button
      onClick={() => setActivePage("analyzer")}
      className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Analyze Now
    </button>
  </div>
)}
        <div className="space-y-2">
          {history.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="p-2 border rounded-lg text-sm text-gray-600"
            >
              {item.text.substring(0, 60)}...
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;