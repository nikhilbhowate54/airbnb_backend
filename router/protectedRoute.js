const auth = require("../middleware/auth");
const verifyToken = require("../middleware/auth");
const permit = require("../middleware/roles");
const express = require("express");
const { findOne } = require("../models/users");
const Role = require("../models/role");
const users = require("../models/users");
const role = require("../models/role");

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`hello ${req.user.role}`);
});

router.get("/admin", verifyToken, permit("admin"), (req, res) => {
  res.send("welcome admin");
});

router.post("/admin/roles", auth, async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const exisiting = await Role.findOne({ name });
    console.log("exisiting", exisiting);

    if (exisiting) {
      return res.status(400).json({ error: "already role is avaliable" });
    }

    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json({ message: "role created", role: newRole });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});
// change user permission
router.put(
  "/admin/roles/permissions/:name",
  auth,
  // permit("admin"),
  async (req, res) => {
    try {
      const { name } = req.params;
      console.log(name);
      const { permissions } = req.body;
      const role = await Role.findOneAndUpdate(
        { name },
        { permissions },
        { new: true }
      );
      res.status(200).json({ message: "role update", role });
    } catch (error) {
      console.log(error);
      
    }
  }
);
// we get all users
router.get("/admin/user", auth, async (req, res) => {
  const user = await users.find().select("-password");
  // console.log(user);

  res.status(200).json(user);
});

// it update user role
router.put("/admin/user/:userId", auth, async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.body.rolename });
    // console.log(role);

    if (!role) return res.status(404).json({ error: "role not found" });

    const useme = await users
      .findOneAndUpdate(
        { _id: req.params.userId },
        {
          role: role._id,
        },
        { new: true }
      )
      .populate("role");
    res.status(200).json({ message: "user is updated", useme });
  } catch (error) {
    console.log(error);
  }
});

// to get all permission

router.get("/admin/permission/:role", async (req, res) => {
  let roles = await role.findOne({ name: req.params.role });
  if (!roles) return res.status(404).json({ message: "role is not found" });
  res.json(roles.permissions);
});
// to get all roles
router.get("/admin/user/roles", async (req, res) => {
  let roles = await role.find();
  console.log(roles);
  
  if (!roles) return res.status(404).json({ message: "role is not found" });
  res.json(roles);
});
// to get all roles
router.get("/admin/user/roles/:name", async (req, res) => {
  let roles = await role.findOne({name:req.params.name});
  console.log(roles);
  
  if (!roles) return res.status(404).json({ message: "role is not found" });
  res.json(roles);
});

// POST /admin/plans
router.post('/admin/plans', async (req, res) => {
  try {
    const { name, durationType, price, maxProperties, features } = req.body;

    const plan = new SubscriptionPlan({
      name,
      durationType,
      price,
      maxProperties,
      features
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/host/subscribe/:planId
// router.post('/host/subscribe/:planId', async (req, res) => {
//   try {
//     const planId = req.params.planId;
//     const userId = req.user._id; // from auth middleware

//     const plan = await SubscriptionPlan.findById(planId);
//     if (!plan) return res.status(404).json({ error: 'Plan not found' });

//     const startDate = new Date();
//     const endDate = new Date();
//     if (plan.durationType === 'monthly') {
//       endDate.setMonth(endDate.getMonth() + 1);
//     } else if (plan.durationType === 'yearly') {
//       endDate.setFullYear(endDate.getFullYear() + 1);
//     }

//     await users.findByIdAndUpdate(userId, {
//       subscription: {
//         plan: plan._id,
//         startDate,
//         endDate,
//         isActive: true
//       }
//     });

//     res.json({ message: 'Subscription activated', plan });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = router;
