function Insights({ result }) {
  if (!result) {
    return (
      <p className="text-gray-400">
        No data yet. Analyze a resume first.
      </p>
    );
  }

  const insights = result.insights || {};
const breakdown = result.breakdown || {
  skillsScore: 0,
  projectScore: 0,
  experienceScore: 0
};

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <h1 className="text-2xl font-bold text-gray-800">
        Resume Insights
      </h1>

      {/* 🔥 SCORE BREAKDOWN */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Skills Strength</p>
          <h2 className="text-xl font-semibold mb-2">
            {breakdown.skillsScore}%
          </h2>
          <div className="bg-gray-200 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${breakdown.skillsScore}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Project Strength</p>
          <h2 className="text-xl font-semibold mb-2">
            {breakdown.projectScore}%
          </h2>
          <div className="bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${breakdown.projectScore}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Experience Strength</p>
          <h2 className="text-xl font-semibold mb-2">
            {breakdown.experienceScore}%
          </h2>
          <div className="bg-gray-200 h-2 rounded-full">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${breakdown.experienceScore}%` }}
            />
          </div>
        </div>

      </div>

      {/* 🔥 INSIGHT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Strengths */}
        <div className="bg-white p-5 rounded-xl border">
          <h2 className="font-semibold mb-3 text-green-600">
            Strengths
          </h2>
          <ul className="space-y-2 text-sm">
            {insights.strengths.map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white p-5 rounded-xl border">
          <h2 className="font-semibold mb-3 text-red-600">
            Weaknesses
          </h2>
          <ul className="space-y-2 text-sm">
            {insights.weaknesses.map((item, i) => (
              <li key={i}>✖ {item}</li>
            ))}
          </ul>
        </div>

        {/* Priority */}
        <div className="bg-white p-5 rounded-xl border">
          <h2 className="font-semibold mb-3 text-blue-600">
            Priority Actions
          </h2>
          <ul className="space-y-2 text-sm">
            {insights.priority.map((item, i) => (
              <li key={i}>→ {item}</li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}

export default Insights;