import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGONDB_SECRET)
  .then(() => app.listen(PORT, () => console.log("MongooseDB is running on Port 8000")))
  .catch((err) => console.log(err));

// middleware

app.use(express.json({ limit: "2100000kb" }));
app.use(cors());
app.use("/post", postRoutes);
app.use("/user", userRoutes);

// app.listen(8000, () => {
//   console.log("Server is running on Port 8000.");
// });
