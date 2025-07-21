const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  title: String,
  descripation: String,
  price: Number,
  location: String,
  images: [String],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Property", propertySchema);
