const express = require("express");
const { attendenceController } = require("../controllers/attendenceController");

const router = express.Router();

// Get attendance for a user
router.get("/:userID", attendenceController.getAttendance);

// Add attendance records
router.post("/:userID/add", attendenceController.addAttendance);

// Get attendance for a child by name
router.get("/child/:childName", attendenceController.getChildAttendance);

// Delete attendance by child ID
router.delete("/delete/:childID", attendenceController.deleteAttendance);

// Get attendance history for a specific date
router.get("/:userID/history", attendenceController.getAttendanceHistory);

module.exports = router;
