const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/airbnb");
    console.log('server is connected');
    
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};
module.exports=connectDb