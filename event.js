const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  deleteEvents, //👈👈
  updateEvent,
} = require("../controllers/event");
const { authenticateJWT } = require("../middleware/auth.middleware");

router.post("/", authenticateJWT, createEvent);

router.get("/", getEvents);

router.delete("/:id", authenticateJWT, deleteEvents);

router.put("/:id", authenticateJWT, updateEvent);

module.exports = router;
