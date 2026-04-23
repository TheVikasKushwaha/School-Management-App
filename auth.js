// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/User.Model"); //👈
// const jwt = require("jsonwebtoken");

// //Register Route
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ status: "N", error: "All fields are required" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ status: "N", error: "User with this email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();
//     return res
//       .status(201)
//       .json({ status: "Y", message: "User Registered Successfully" });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "N", error: `Internal Server Error: ${error}` });
//   }
// });

// //Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ status: "N", error: "All fields are required" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return res
//         .status(400)
//         .json({ status: "N", error: "Invalid email or password" });
//     }
//     const isValidPassword = await bcrypt.compare(
//       password,
//       existingUser.password
//     );
//     if (!isValidPassword) {
//       return res
//         .status(400)
//         .json({ status: "N", error: "Invalid email or password" });
//     }
//     const token = jwt.sign(
//       {
//         userId: existingUser._id,
//         email: existingUser.email,
//         name: existingUser.name,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     return res
//       .status(201)
//       .json({
//         status: "Y",
//         message: "Log In  Successfully",
//         token,
//         user: {
//           id: existingUser._id,
//           name: existingUser.name,
//           email: existingUser.email,
//         },
//       });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "N", error: `Internal Server Error: ${error}` });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.Model");
const jwt = require("jsonwebtoken");

// =======================
// Register Route
// =======================
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "N",
        error: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin", // 👈 FIRST ADMIN (change to "user" later)
    });

    await newUser.save();

    return res.status(201).json({
      status: "Y",
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: "Internal Server Error",
    });
  }
});

// =======================
// Login Route
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: "N",
        error: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        status: "N",
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role, // 👈 ROLE ADDED
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: "Y",
      message: "Log In Successfully",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role, // 👈 ROLE SENT TO FRONTEND
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
