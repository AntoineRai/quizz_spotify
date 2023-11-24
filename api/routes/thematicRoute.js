const express = require("express");
const router = express.Router();
const thematicModel = require('./models/Thematic');

app.get('/get_thematic', async (req, res) => {
    try {
        const data = await thematicModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.delete('/delete_thematic', async (req, res) => {
    const thematic = getThematic(req.params.thematicId);

    if (!thematic) return res.status(404).json({});
    const index = thematics.indexOf(thematic);
    thematics.splice(index, 1);
    res.status(200).json({});
});

app.put('/put_thematic', async (req, res) => {
    const thematic = getThematic(req.params.thematicId);

    if (!thematic) return res.status(404).json({});
    thematic.name = req.body.name;
    res.json(thematic);
});

module.exports = router;