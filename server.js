require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/callFunction", async (req, res) => {
    try {
        const functionUrl = process.env.AZURE_FUNCTION_URL;
        const functionKey = process.env.AZURE_FUNCTION_KEY;

        const response = await axios.get(`${functionUrl}?code=${functionKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error calling Azure Function" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});