const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma.js");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const leadRoutes = require("./routes/leadRoute");

const app = express();

// Configure CORS to allow requests from frontend
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => res.send("Backend running"));

const PORT = process.env.PORT || 4000;
prisma.$connect().then(() => console.log("Database connected"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
