import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// import { router as invoices } from "./bookkeeper/routes/invoices.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = process.env.CONNECTION_URL;

// app.use("/invoices", invoices);

app.get("/", function (_, res) {
  res.send("--- Welcome to Bookkeeper API :) ---");
});

app.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});

// mongoose
//   .connect(CONNECTION_URL)
//   .then(function () {
//     app.listen(PORT, function () {
//       console.log(`Server running on port: ${PORT}`);
//     });
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
