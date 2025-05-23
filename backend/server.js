import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoutes.js";

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(cors({ origin: FRONTEND_URL }));
mongoose
  .connect(MONGO_URL, { dbName: "Book-Store" })
  .then(() => {
    console.log("DataBase Connected");
    // app.listen(PORT, () => {
    //   console.log("Server run on port: ", PORT);
    // });
  })
  .catch((err) => console.log("There is an Error", err));

app.use(express.json());
app.use("/api/v1", bookRouter);

export default app;
