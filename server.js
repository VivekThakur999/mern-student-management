const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    department: String
});

const Student = mongoose.model("Student", studentSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// Home route
app.get("/", (req, res) => {
    res.send("MERN Application Running");
});

// Get all students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Add student
app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();

    res.json({
        message: "Student Added Successfully",
        student
    });
});

// Delete student
app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student Deleted Successfully"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});