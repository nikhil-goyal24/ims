require("dotenv").config({ path: "./.env" });
const express = require("express");
const connectDB = require("./Utils/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// Connect Database
connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
// app.use(cors({ origin: "*" }));
app.use(cookieParser("secret"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Routers
app.use("/api/auth", require("./Route/AuthRouter"));
app.use("/api/choice", require("./Route/ChoiceFillingRouter"));

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, "0.0.0.0", (err) => {
  if (err) throw err;
  console.log(`==>> Ready on http://localhost:${PORT}`);
});

// DB error handler
process.on("unhandledRejection", (err, promise) => {
  console.log(`Log Error: ${err}`);
  server.close(() => process.exit(1));
});
