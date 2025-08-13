const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },

  // subscription: {
  //   plan: {
  //     type: String,
  //     enum: ["Free", "Standard", "Premium"],
  //     default: "Free"
  //   },
  //   durationType: {
  //     type: String,
  //     enum: ["monthly", "yearly", null], // monthly or yearly for paid plans
  //     default: null
  //   },
  //   startDate: {
  //     type: Date,
  //     default: Date.now
  //   },
  //   endDate: {
  //     type: Date
  //   },
  //   isActive: {
  //     type: Boolean,
  //     default: true
  //   }
  // }
   subscription: {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan'
    },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("User", userSchema);
// https://excalidraw.com/#json=1wZyxDMyiGsHSkSVz1L42,F9Z-wsp95rR8wn5tmQNP3A