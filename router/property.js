const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const Router = express.Router();

const Property = require("../models/property");
const upload = require("../middleware/upload");
const property = require("../models/property");

Router.post(
  "/properties",
  auth,
  upload.array("images", 5),
  async (req, res) => {
    console.log("hi");
    try {
      const { title, descripation, price, location } = req.body;

      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
      if (!title || !price || !location || !req.files.length) {
        return res
          .status(400)
          .json({ error: "All fields and image(s) are required." });
      }
      const newProperties = new Property({
        title,
        descripation,
        price,
        images: imageUrls,
        location,
        host: req.user.id,
      });
      await newProperties.save();
      res.status(201).json(newProperties);
    } catch (error) {
      res.status(500).json({ error: "error creating property" });
    }
  }
);
Router.put( "/properties/:id",auth,async(req,res)=>{
    try {
        const property = await Property.findById(req.params.id)
        if(!property) res.status(404).json({message:"not property"})

            Object.assign(property,req.body)
            // await pro
    } catch (error) {
        
    }
})
Router.get("/properties",auth,async (req,res)=>{
  try {
    const properties = await property.find()
    console.log(properties);
    
    res.status(200).json(properties)
  } catch (error) {
    console.log(error);
    
  }
}

)

module.exports = Router;
