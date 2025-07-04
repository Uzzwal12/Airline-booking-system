const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { authRouter } = require("./routes/auth");
const { flightRouter } = require("./routes/flight");
const { bookingRouter } = require("./routes/booking");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/flights", flightRouter);
app.use("/api/booking", bookingRouter);

app.use("/", (req, res) => {
  console.log(`${req.method} request for '${req.url}'`);
  res.send("Welcome to the Airline Booking System API");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.port, () => {
      console.log(`Server is running on port ${process.env.port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
