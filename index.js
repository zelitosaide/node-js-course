import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { router as invoices } from "./bookkeeper/routes/invoices.js";
import { router as products } from "./bookkeeper/routes/products.js";
import { router as boxes } from "./bookkeeper/routes/boxes.js";
import { router as recipes } from "./bookkeeper/routes/recipes.js";
import { router as boxItems } from "./bookkeeper/routes/boxItems.js";
import { router as recipeItems } from "./bookkeeper/routes/recipeItems.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use("/invoices", invoices);
app.use("/products", products);
app.use("/boxes", boxes);
app.use("/boxItems", boxItems);
app.use("/recipes", recipes);
app.use("/recipeItems", recipeItems);

app.get("/", function (_, res) {
  res.send("--- Welcome to Bookkeeper API :) --- Zelito");
});

mongoose
  .connect(CONNECTION_URL)
  .then(function () {
    app.listen(PORT, function () {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
