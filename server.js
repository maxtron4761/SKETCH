const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve website files
app.use(express.static(__dirname));

// Create data folder
const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// Function to save data in JSON files
function saveData(filename, newData) {
    const filePath = path.join(dataFolder, filename);

    let existingData = [];

    if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    existingData.push({
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        ...newData
    });

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
}

// Reservation API
app.post("/api/reservations", (req, res) => {
    const { name, email, date, guests } = req.body;

    if (!name || !email || !date || !guests) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required reservation fields."
        });
    }

    saveData("reservations.json", req.body);

    res.json({
        success: true,
        message: "Your table has been reserved successfully!"
    });
});

// Contact API
app.post("/api/contacts", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required contact fields."
        });
    }

    saveData("contacts.json", req.body);

    res.json({
        success: true,
        message: "Your message has been submitted successfully!"
    });
});

// Order API
app.post("/api/orders", (req, res) => {
    const { name, email, address, items } = req.body;

    if (!name || !email || !address || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid order details."
        });
    }

    saveData("orders.json", req.body);

    res.json({
        success: true,
        message: "Your order has been placed successfully!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Sketch Cafe server running at http://localhost:${PORT}`);
});