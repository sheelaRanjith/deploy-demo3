const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// User model
const User = require("./models/userModels");

// Register API
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Get users API
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);