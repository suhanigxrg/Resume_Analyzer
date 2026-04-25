const mongoose = require("mongoose");

// 🔥 define structure for each analysis
const analysisSchema = new mongoose.Schema({
  text: String,
  result: Object,
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,

  // ✅ structured history
  history: [analysisSchema]
});

module.exports = mongoose.model("User", userSchema);