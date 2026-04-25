const skillsList = [
  "Java", "Python", "HTML", "CSS", "JavaScript",
  "React", "Node", "SQL", "Git"
];

function analyzeResume(text) {
  const lowerText = text.toLowerCase();

  let foundSkills = [];
  let missingSkills = [];

  skillsList.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 🚀 ADVANCED SCORING
  let score = 0;

  // Skill score
  score += (foundSkills.length / skillsList.length) * 50;

  // Projects
  if (lowerText.includes("project")) score += 15;

  // Experience
  if (lowerText.includes("intern") || lowerText.includes("experience")) score += 15;

  // Education
  if (lowerText.includes("btech") || lowerText.includes("degree")) score += 10;

  // Keywords density
  const wordCount = text.split(" ").length;
  if (wordCount > 300) score += 10;

  score = Math.min(100, Math.round(score));

  // 🚀 SMART SUGGESTIONS
  let suggestions = [];

  if (foundSkills.length < 5) {
    suggestions.push("Increase technical depth by adding more relevant skills.");
  }

  if (!lowerText.includes("project")) {
    suggestions.push("Add 2–3 strong projects with measurable impact.");
  }

  if (!lowerText.includes("intern")) {
    suggestions.push("Include internships or real-world experience.");
  }

  if (!lowerText.includes("react") && !lowerText.includes("node")) {
    suggestions.push("Add modern tech stack (React, Node.js).");
  }

  if (!lowerText.includes("achievement")) {
    suggestions.push("Add achievements or certifications.");
  }

  if (wordCount < 150) {
    suggestions.push("Your resume is too short. Add more details.");
  }

const insights = {
  strengths: [],
  weaknesses: [],
  priority: []
};

// Strengths
if (foundSkills.length >= 5) {
  insights.strengths.push("Strong technical skillset");
}

if (lowerText.includes("project")) {
  insights.strengths.push("Has project experience");
}

// Weaknesses
if (foundSkills.length < 5) {
  insights.weaknesses.push("Lack of sufficient technical skills");
}

if (!lowerText.includes("intern")) {
  insights.weaknesses.push("No internship experience mentioned");
}

// Priority
if (!lowerText.includes("project")) {
  insights.priority.push("Add at least 2 projects");
}

if (!lowerText.includes("react") && !lowerText.includes("node")) {
  insights.priority.push("Learn modern tech stack (React/Node)");
}

const breakdown = {
  skillsScore: Math.round((foundSkills.length / skillsList.length) * 100),
  projectScore: lowerText.includes("project") ? 100 : 30,
  experienceScore: lowerText.includes("intern") ? 100 : 40,
};

  return {
    score,
    foundSkills,
    missingSkills,
    suggestions,
    wordCount,
    insights,
  breakdown
  };
}

module.exports = analyzeResume;