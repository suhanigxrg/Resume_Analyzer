import { useState } from "react";
import axios from "axios";
import SkillChart from "../components/SkillChart";

function Analyzer({ setLastResult }) {

  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert("Please enter resume text");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze`,
        { resumeText }
      );

      const data = response.data;
      setResult(data);
      setLastResult(data);
      const newEntry = {
        id: Date.now(),
        text: resumeText,
        result: data
      };

      const updatedHistory = [newEntry, ...history];
      const limitedHistory = updatedHistory.slice(0, 10);

      setHistory(limitedHistory);
    

    } catch (error) {
      console.error(error);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }

    await axios.post(`${import.meta.env.VITE_API_URL}/save-analysis`, {
  userId: JSON.parse(localStorage.getItem("user"))._id,
  text: resumeText,
  result: data
});
  };

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Resume Analyzer
      </h1>

      {/* INPUT SECTION */}
      <div className="bg-white p-5 rounded-xl shadow-sm border mb-8 max-w-3xl mx-auto">
        
        <textarea
          rows="8"
          placeholder="Paste your resume content here..."
          className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400 text-sm"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="space-y-8">

          {/* METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500 text-sm">Score</p>
              <h2 className="text-lg font-semibold text-green-600">
                {result.score}%
              </h2>

              <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500 text-sm">Skills Found</p>
<h2 className="text-lg font-semibold mb-2">
  {result.foundSkills.length}
</h2>

<div className="flex flex-wrap gap-1">
  {result.foundSkills.slice(0, 5).map((skill, i) => (
    <span
      key={i}
      className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs"
    >
      {skill}
    </span>
  ))}
</div>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500 text-sm">Missing Skills</p>
<h2 className="text-lg font-semibold mb-2">
  {result.missingSkills.length}
</h2>

<div className="flex flex-wrap gap-1">
  {result.missingSkills.slice(0, 5).map((skill, i) => (
    <span
      key={i}
      className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs"
    >
      {skill}
    </span>
  ))}
</div>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500 text-sm">Word Count</p>
            <p className="text-xs text-gray-400">
              {result.wordCount < 150 ? "Too short" : "Good length"}
              {result.wordCount}
            </p>
            </div>

          </div>

          {/* CHART + SUGGESTIONS */}
          <div className="grid md:grid-cols-2 gap-6 items-start">

            <div className="flex justify-center">
              <div className="w-72 h-72">
                <SkillChart 
                  found={result.foundSkills} 
                  missing={result.missingSkills} 
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <h2 className="font-semibold mb-3">💡 Suggestions</h2>
              <ul className="space-y-2 text-gray-700 text-sm">
                {result.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* SKILLS */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded-xl border">
              <h2 className="font-semibold mb-3">✅ Found Skills</h2>
              <div className="flex flex-wrap gap-2">
                {result.foundSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <h2 className="font-semibold mb-3">❌ Missing Skills</h2>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* HISTORY */}
      <div className="mt-10 bg-white p-5 rounded-xl border max-w-3xl mx-auto">
        <h2 className="font-semibold mb-4">Previous Analyses</h2>

        {history.length === 0 && (
          <p className="text-gray-400 text-sm">No history yet</p>
        )}

        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setResult(item.result)}
              className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm"
            >
              {item.text.substring(0, 60)}...
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Analyzer;