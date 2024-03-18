require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const cors = require ("cors");
const errorHandler = require("./middleware/errorHandler");

// Connect Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Error Handler 
app.use(errorHandler);

const PORT = process.env.PORT || 8000;


const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// DB error handler
process.on("unhandledRejection", (err, promise) => {
    console.log(`Log Error: ${err}`);
    server.close(() => process.exit(1));
  });
  