const express = require("express");
const cors = require("cors");
require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "SafePay backend is running"
    });
});

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`SafePay backend running on http://localhost:${PORT}`);
});