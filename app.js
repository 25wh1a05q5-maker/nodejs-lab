
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const secretKey = "student123";

let students = [
    { id: 1, name: "Anil", age: 50 },
    { id: 2, name: "Kumar", age: 51 }
];

// LOGIN - Generate JWT token
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        const token = jwt.sign(
            { username: username },
            secretKey,
            { expiresIn: "1h" }
        );

        res.json({ token: token });
    } else {
        res.status(401).send("Invalid username or password");
    }
});

// JWT verification middleware
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Token required");
    }

    try {
        const jwtToken = token.split(" ")[1];
        jwt.verify(jwtToken, secretKey);
        next();
    } catch {
        res.status(401).send("Invalid token");
    }
}

// GET - Read all students
app.get("/students", verifyToken, (req, res) => {
    res.json(students);
});

// POST - Add a student
app.post("/students", verifyToken, (req, res) => {
    students.push(req.body);
    res.send("Student added successfully");
});

// PUT - Update a student
app.put("/students/:id", verifyToken, (req, res) => {
    let student = students.find(s => s.id == req.params.id);

    if (student) {
        student.name = req.body.name;
        student.age = req.body.age;
        res.send("Student updated successfully");
    } else {
        res.send("Student not found");
    }
});

// DELETE - Delete a student
app.delete("/students/:id", verifyToken, (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.send("Student deleted successfully");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
