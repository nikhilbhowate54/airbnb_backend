const verifyToken = require("../middleware/auth");
const permit = require("../middleware/roles");
const express = require("express");
const router = express.Router();
router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`hello ${req.user.role}`);
});
router.get("/admin",verifyToken,permit('admin'),(req,res)=>{
  res.send('welcome admin')
})
module.exports = router;
