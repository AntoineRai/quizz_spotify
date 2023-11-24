const express = require("express");
const router = express.Router();
const Thematic = require('../models/Thematic');

app.get('/get_thematic', async (req, res) => {
    try {
        const data = await thematicModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.delete('/delete_thematic/:idThematic', async (req, res) => {
    try {
        const thematic = await thematicModel.findByIdAndDelete(req.params.idThematic);
        if (!thematic) return res.status(404).json({});
        res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.put('/put_thematic/:idThematic', async (req, res) => {
    try {
        const thematic = await thematicModel.findByIdAndUpdate(req.params.idThematic, { name: req.body.nom }, { new: true });
        if (!thematic) return res.status(404).json({});
        res.json(thematic);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;