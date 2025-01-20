const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ["present", "not present"], required: true },
  date: { type: String, required: true }, // Stored in YYYY-MM-DD format
});

module.exports = mongoose.model("Attendance", attendanceSchema);
