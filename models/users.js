const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin","host"],
    default: "user",
  },
});
module.exports = mongoose.model("User", userSchema);
