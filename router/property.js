const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const Router = express.Router();

const Property = require("../models/property");
const upload = require("../middleware/upload");

Router.post(
  "/properties",
  auth,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { title, descripation, price, images, location } = req.body;
      const newProperties = new Property({
        title,
        descripation,
        price,
        images:req.files.map((it)=>it.path),
        location,
        host :req.user.id
      });
      await newProperties.save();
      res.status(201).json(newProperties);
    } catch (error) {
      res.status(500).json({ error: "error creating property" });
    }
  }
);

module.exports = Router;
