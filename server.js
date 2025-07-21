const express = require("express");
const app = express();
const connectDb = require("./config/db");
const auth = require("./router/auth");
const cors = require("cors");
require("dotenv").config();
const protectedRoute =require('./router/protectedRoute')
connectDb();
app.use(
  cors({
    origin: "http://localhost:5000/",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/protected",protectedRoute);

app.listen(5000, () => console.log("server running "));
