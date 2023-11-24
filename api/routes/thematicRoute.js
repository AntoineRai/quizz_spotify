const express = require("express");
const thematicModel = require('../models/Thematic');
const router = express.Router();
const startApp = require('../startApp');

router.get('/get_thematic', async (req, res) => {
    try {
        const data = await thematicModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.delete('/delete_thematic/:thematicId', async (req, res) => {
    try {
        const thematic = await thematicModel.findByIdAndDelete(req.params.thematicId);
        if (!thematic) return res.status(404).json({});
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add_thematic', async (req, res) => {
    console.log(req.body);
    try {
      const { idThematic, nom, url } = req.body;
      console.log(req.body);
      console.log(nom);
      console.log(url);
  
      if (!idThematic || !nom || !url) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }
  
      const thematic = new thematicModel({
        idThematic,
        nom,
        url
      });
  
      const savedThematic = await thematic.save();
      
      res.status(200).json(savedThematic);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  


router.put('/put_thematic/:thematicId', async (req, res) => {
    try {
        const thematic = await thematicModel.findByIdAndUpdate(
            req.params.thematicId,
            { name: req.body.name },
            { new: true }
        );
        if (!thematic) return res.status(404).json({});
        res.json(thematic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
