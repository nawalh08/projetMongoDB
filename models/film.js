const mongoose = require('mongoose');

const schemaFilm = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  realisateur: { type: String, required: true },
  dateSortie: { type: Date, required: true }
});

const Film = mongoose.model('Film', schemaFilm);

module.exports = Film;