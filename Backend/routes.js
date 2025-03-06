const express = require('express');
const mongoose = require('mongoose');
const Search = require('./models/Search');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/weirdSearches', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/searches', async (req, res) => {
    try {
        const newSearch = new Search(req.body);
        await newSearch.save();
        res.status(201).json(newSearch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/searches', async (req, res) => {
    try {
        const searches = await Search.find();
        res.status(200).json(searches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/searches/:id', async (req, res) => {
    try {
        const search = await Search.findById(req.params.id);
        if (!search) return res.status(404).json({ message: 'Search not found' });
        res.status(200).json(search);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/searches/:id', async (req, res) => {
    try {
        const updatedSearch = await Search.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSearch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/searches/:id', async (req, res) => {
    try {
        await Search.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const searchSchema = new mongoose.Schema({
    query: { type: String, required: true },
    submittedBy: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Search', searchSchema);
