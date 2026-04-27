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
app.use(express.json());

const User = require("./models/User");

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔍 debug

    const { email, password } = req.body;

    // check if empty
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create new user
    const user = new User({
      email,
      password,
      history: []
    });

    await user.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json(user);

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed" });
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