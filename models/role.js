const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [ mongoose.Schema.Types.Mixed  ],
});

module.exports = mongoose.model("Role", roleSchema);
