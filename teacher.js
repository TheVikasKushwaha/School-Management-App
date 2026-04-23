const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  deleteTeacher, //👈👈
  updateTeacher,
} = require("../controllers/teacher");
const { authenticateJWT } = require("../middleware/auth.middleware");

router.post("/", authenticateJWT, createTeacher);

router.get("/", getTeachers);

router.delete("/:id", authenticateJWT, deleteTeacher);

router.put("/:id", authenticateJWT, updateTeacher);

module.exports = router;
