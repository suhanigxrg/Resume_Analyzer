const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const analyzeResume = require("./analyzer");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI)
// mongoose.connect("mongodb://127.0.0.1:27017/resumeAI")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
// Middleware
app.use(cors());
app.use(bodyParser.json());

const User = require("./models/User");

// SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = new User({
    email,
    password,
    history: []
  });

  await user.save();

  res.json({ message: "User created" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.json(user);
});

app.post("/save-analysis", async (req, res) => {
  const { userId, text, result } = req.body;

  try {
    const user = await User.findById(userId);

    user.history.unshift({ text, result });

    await user.save();

    res.json({ message: "Saved successfully" });

  } catch (err) {
    res.status(500).json({ error: "Failed to save" });
  }
});


// Test route
app.get("/", (req, res) => {
  res.send("Resume Analyzer API Running");
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Main API
app.post("/analyze", (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: "Resume text is required" });
  }

  const result = analyzeResume(resumeText);

  res.json(result);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});