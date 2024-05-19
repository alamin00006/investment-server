import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

import usersRoute from "./routes/users.js";
import adminUsersRoute from "./routes/adminUsers.js";
import bannerRoute from "./routes/banner.js";
import projectRoute from "./routes/project.js";
import categoryRoute from "./routes/category.js";

import cookieParser from "cookie-parser";
import cors from "cors";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
// app.use(
//   "/public/uploads",
//   express.static(path.join(__dirname, "public/uploads"))
// );
app.use("/public/uploads", express.static("public/uploads"));
dotenv.config();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log("successfully connect with mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoute);
app.use("/api/admin-users", adminUsersRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/project", projectRoute);
app.use("/api/category", categoryRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong !";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("connect with backend");
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
