import mongo from "./database/index.js";
import express from "express";
import { PORT } from "./utils/constants.js";

const app = express();

mongo.connect();

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
