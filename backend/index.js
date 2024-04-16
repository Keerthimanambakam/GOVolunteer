import express from "express";
import cors from "cors";

const app = express();

// Apply CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define your POST route
app.post("/getData", (req, res) => {
    const data = req.body;
    console.log(data);
    // Respond to the client
    res.json({ message: "Data received successfully" });
});

// Start the server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
