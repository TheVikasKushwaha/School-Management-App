const express = require("express");
const router = express.Router();
const {
  createNotice,
  getNotices,
  deleteNotice, //👈👈
  updateNotice,
} = require("../controllers/notice");

const { authenticateJWT } = require("../middleware/auth.middleware");

router.post("/", authenticateJWT, createNotice);

router.get("/", getNotices);

router.delete("/:id", authenticateJWT, deleteNotice);

router.put("/:id", authenticateJWT, updateNotice);

module.exports = router;
