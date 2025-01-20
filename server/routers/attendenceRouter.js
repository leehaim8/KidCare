const express = require("express");
const { attendenceController } = require("../controllers/attendenceController");

const router = express.Router();

router.get("/:userID", attendenceController.getAttendance); // Get attendance for a user
router.post("/:userID/add", attendenceController.addAttendance); // Add attendance records
router.get("/child/:childName", attendenceController.getChildAttendance); // Get attendance for a child by name
router.delete("/delete/:childID", attendenceController.deleteAttendance); // Delete attendance by child ID

module.exports = router; // Default export
