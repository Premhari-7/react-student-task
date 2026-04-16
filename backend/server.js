const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require("./models/Student"); // import model

const app = express();

app.use(cors());
app.use(express.json());

/* ================== MongoDB Connection ================== */
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================== Test Route ================== */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ================== CREATE ================== */
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ================== READ ================== */
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({ isDeleted: false });
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ================== UPDATE ================== */
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ================== SOFT DELETE ================== */
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });
    res.send("Student soft deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ================== SERVER ================== */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});