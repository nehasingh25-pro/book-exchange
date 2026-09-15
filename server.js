const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

app.use(express.static("public"));

connectDB();

app.use("/api", bookRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});