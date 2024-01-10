import Mongoose from "mongoose";
import { DB_CONNECTION } from "../utils/constants.js";

const connect = () => {
  Mongoose.connect(DB_CONNECTION, {
    dbName: 'projeto3'
  })
    .then(() => {
      console.log("Conectado na base de Dados");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
    })
    .finally(() => {
      return;
    });
};

export default { connect };