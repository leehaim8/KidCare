const Attendance = require("../models/attendenceModel");

const attendenceController = {
  // Get attendance records for a specific user
  async getAttendance(req, res) {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const attendanceRecords = await Attendance.find({ userID: userID });
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add attendance records
  async addAttendance(req, res) {
    const { userID } = req.params;
    const { attendance } = req.body;

    if (!userID || !attendance || !Array.isArray(attendance)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    try {
      const records = attendance.map((record) => ({
        ...record,
        userID,
      }));

      await Attendance.insertMany(records);
      res.status(201).json({ message: "Attendance records added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get attendance for a specific child by name
  async getChildAttendance(req, res) {
    const { childName } = req.params;

    if (!childName) {
      return res.status(400).json({ message: "Child name is required" });
    }

    try {
      const childAttendance = await Attendance.find({ name: childName });

      if (!childAttendance.length) {
        return res.status(404).json({ message: "Attendance records not found for the child" });
      }

      res.status(200).json(childAttendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete attendance records for a specific child
  async deleteAttendance(req, res) {
    const { childID } = req.params;

    if (!childID) {
      return res.status(400).json({ message: "Child ID is required" });
    }

    try {
      const deletedRecord = await Attendance.findOneAndDelete({ childID });

      if (!deletedRecord) {
        return res.status(404).json({ message: "Attendance record not found" });
      }

      res.status(200).json({ message: "Attendance record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { attendenceController };
