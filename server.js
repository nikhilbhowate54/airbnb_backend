const express = require("express");
const app = express();
const connectDb = require("./config/db");
const auth = require("./router/auth");
const cors = require("cors");
const Property = require("./router/property");
const subscription  =require("./router/subscriptionRoutes")
const path =require('path')
require("dotenv").config();
const protectedRoute = require("./router/protectedRoute");
connectDb();
app.use(
  cors({ 
    origin: "http://localhost:5173/",
    credentials: true,
  }) 
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.json());
app.use("/list", Property); 
app.use("/subscription", subscription); 
app.use("/auth", auth);
app.use("/protected", protectedRoute);

app.listen(5000, () => console.log("server running "));
