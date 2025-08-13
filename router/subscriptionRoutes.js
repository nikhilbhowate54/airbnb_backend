
const express = require("express");
const router = express.Router();
const SubscriptionPlan = require("../models/SubscriptionPlan");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Host views all available plans
router.get("/plans", auth, async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Host buys a plan
router.post("/buy", auth, async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await SubscriptionPlan.findById(planId);

    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationInDays);

    await User.findByIdAndUpdate(req.user._id, {
      subscription: { planId: plan._id, startDate, endDate },
    });

    res.json({ message: `Subscribed to ${plan.name} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/subscription/plans
// router.post("/plans", auth, async (req, res) => {
//   try {
//     // Check if the logged-in user is admin
//     if (req.user.roleName !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admin only." });
//     }

//     const { name, durationType, price, maxProperties, features } = req.body;

//     const plan = new SubscriptionPlan({
//       name,
//       durationType,
//       price,
//       maxProperties,
//       features
//     });

//     await plan.save();
//     res.status(201).json(plan);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


module.exports = router;
