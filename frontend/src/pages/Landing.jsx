function Landing({ setActivePage }) {
  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-5 border-b">
        <h1 className="text-xl font-bold text-green-600">
          ResumeAI
        </h1>

        <button
          onClick={() => setActivePage("analyzer")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Try Now
        </button>
        <button
  onClick={() => setActivePage("login")}
  className="border px-4 py-2 rounded-lg"
>
  Login
</button>
      </nav>

      {/* HERO */}
      <div className="text-center mt-24 px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Stop Guessing.  
          <span className="text-green-600"> Start Improving Your Resume.</span>
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
          ResumeAI doesn’t just analyze — it shows what’s missing, tracks your progress,
          and helps you build a stronger profile step by step.
        </p>

        <button
          onClick={() => setActivePage("analyzer")}
          className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-green-700 transition"
        >
          Analyze Resume →
        </button>
      </div>

      {/* FEATURES */}
      <div className="mt-24 grid md:grid-cols-3 gap-8 px-10">

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Deep Analysis</h3>
          <p className="text-gray-500 text-sm">
            Understand strengths, weaknesses, and missing skills in seconds.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-500 text-sm">
            Track how your resume improves over multiple attempts.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Actionable Insights</h3>
          <p className="text-gray-500 text-sm">
            Get clear steps to improve your resume — not just vague feedback.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="mt-24 text-center mb-20">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to improve your resume?
        </h2>

        <button
          onClick={() => setActivePage("analyzer")}
          className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
        >
          Start Now
        </button>
      </div>

    </div>
  );
}

export default Landing;