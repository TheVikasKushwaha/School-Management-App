// CORS allow karta hai ki kaun-kaun frontend tumhari API ko request bhej sakte hain.
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const app = express();
const connectDB = require("./config/db");
connectDB();
const morgan = require("morgan"); //Morgan aapke server par hone wale har HTTP request ko record karta hai
const cors = require("cors");
const port = process.env.PORT;

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//importing routes
const contactRoutes = require("./routes/contact");
const eventRoutes = require("./routes/event");
const galleryRoutes = require("./routes/gallery");
const noticeRoutes = require("./routes/notice");
const teacherRoutes = require("./routes/teacher");
const authRoutes = require("./routes/auth");

//using routes
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
