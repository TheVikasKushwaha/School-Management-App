const express = require("express");
const router = express.Router();
const {
  createGallery,
  getGallerys,
  deleteGallery, //👈👈
  updateGallery,
} = require("../controllers/gallery");
const { authenticateJWT } = require("../middleware/auth.middleware");

router.post("/", authenticateJWT, createGallery);

router.get("/", getGallerys);

router.delete("/:id", authenticateJWT, deleteGallery);

router.put("/:id", authenticateJWT, updateGallery);

module.exports = router;
