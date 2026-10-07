const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "25wh1a05q5"
});

// Test MySQL connection
db.getConnection()
    .then((connection) => {
        console.log("MySQL connected");
        connection.release();
    })
    .catch((error) => {
        console.log("MySQL failed:", error.message);
    });

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Student API");
});

// GET students
app.get("/students", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM STUDENTS");
        res.json(rows);
    } catch (error) {
        res.send("Database error: " + error.message);
    }
});

// POST student
app.post("/students", async (req, res) => {
    try {
        const { NAME, ROLLNO } = req.body;

        await db.execute(
            "INSERT INTO STUDENTS (NAME, ROLLNO) VALUES (?, ?)",
            [NAME, ROLLNO]
        );

        res.send("Student added successfully");
    } catch (error) {
        res.send("Database error: " + error.message);
    }
});

// UPDATE student
app.put("/students/:id", async (req, res) => {
    try {
        const { NAME, ROLLNO } = req.body;

        await db.execute(
            "UPDATE STUDENTS SET NAME = ?, ROLLNO = ? WHERE ID = ?",
            [NAME, ROLLNO, req.params.id]
        );

        res.send("Database updated successfully");
    } catch (error) {
        res.send("Database error: " + error.message);
    }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
    try {
        await db.execute(
            "DELETE FROM STUDENTS WHERE ID = ?",
            [req.params.id]
        );

        res.send("Database deleted successfully");
    } catch (error) {
        res.send("Database error: " + error.message);
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});