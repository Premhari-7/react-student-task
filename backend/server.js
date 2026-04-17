const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const Student = require("./models/Student");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

/* ================= DB ================= */
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= LOGIN API ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

/* ================= AUTH MIDDLEWARE ================= */
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) return res.status(403).send("Token required");

  const token = header.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
}

/* ================= CREATE ================= */
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

/* ================= READ ================= */
app.get("/students", async (req, res) => {
  const students = await Student.find({ isDeleted: false });
  res.send(students);
});

/* ================= UPDATE ================= */
app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(student);
});

/* ================= DELETE ================= */
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, {
    isDeleted: true
  });
  res.send("Soft deleted");
});

/* ================= PROTECTED ROUTE ================= */
app.get("/profile", verifyToken, (req, res) => {
  res.send({
    message: "Protected data accessed",
    user: req.user
  });
});

/* ================= SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});