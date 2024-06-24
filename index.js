import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// Routes import
import usersRoute from "./src/app/modules/user/user.route.js";
import adminUsersRoute from "./src/app/modules/adminUser/adminUser.route.js";
import projectRoute from "./src/app/modules/projects/project.route.js";
import investRoute from "./src/app/modules/investment/invest.route.js";
import categoryRoute from "./src/app/modules/Category/category.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

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

app.use("/api/v1/admin-users", adminUsersRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/invest", investRoute);
app.use("/api/v1/category", categoryRoute);

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
