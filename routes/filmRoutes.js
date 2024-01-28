const express = require('express');
const router = express.Router();
const Film = require('../models/film');

// Route pour afficher les films 
router.get('/views', async (req, res) => {
  try {
    const movies = await Film.find();
    res.render('filmList', { movies }); // res.render avec pug et res.json avec le json
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;