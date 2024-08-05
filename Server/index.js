const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//express app
const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "https://bladequest.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected:", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/authRouters"));

// listen for requests
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
