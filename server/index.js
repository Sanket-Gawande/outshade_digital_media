import express from "express";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const PORT = process.env.PORT || 6900;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

// mongoose connection
console.log("starting server...");
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (Error) => {
    console.log("connecting to mongoDB");
    if (Error) {
      console.log({ Error });
      console.log("mongoDB connection error");
      return;
    }

    app.listen(PORT, "localhost", (error) => {
      if (error) console.log(error);
      console.log(`server is running on port : ${PORT}`);
    });
  }
);
