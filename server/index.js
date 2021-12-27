import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/post.js";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGONDB_SECRET)
  .then(() =>
    app.listen(PORT, () => console.log("MongooseDB is running on Port 8000"))
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});

// middleware

app.use(express.json());
app.use(cors());
app.use("/post", postRoutes);

// app.listen(8000, () => {
//   console.log("Server is running on Port 8000.");
// });
