const Film = require('../models/film');

// Action : Afficher tous les films
const getAllFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.render('filmList', { films });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Action : Afficher un film par son ID
const getFilmById = async (req, res) => {
  const { id } = req.params;
  try {
    const film = await Film.findById(id);
    if (film) {
      res.render('filmDetails', { film });
    } else {
      res.status(404).json({ message: 'Film not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Action : Afficher le formulaire d'ajout de film
const showAddFilmForm = (req, res) => {
  res.render('addFilmForm');
};

// Action : Ajouter un nouveau film
const addFilm = async (req, res) => {
  const { titre, description, realisateur, dateSortie } = req.body;
  const newFilm = new Film({
    titre,
    description,
    realisateur,
    dateSortie,
  });

  try {
    const savedFilm = await newFilm.save();
    res.redirect('/films');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Action : Afficher le formulaire de mise à jour de film
const showUpdateFilmForm = async (req, res) => {
  const { id } = req.params;
  try {
    const film = await Film.findById(id);
    if (film) {
      res.render('updateFilmForm', { film });
    } else {
      res.status(404).json({ message: 'Film not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Action : Mettre à jour un film par son ID
const updateFilm = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFilm = await Film.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedFilm) {
      res.redirect('/films');
    } else {
      res.status(404).json({ message: 'Film not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Action : Supprimer un film par son ID
const deleteFilm = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFilm = await Film.findByIdAndDelete(id);
    if (deletedFilm) {
      res.redirect('/films');
    } else {
      res.status(404).json({ message: 'Film not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFilms,
  getFilmById,
  showAddFilmForm,
  addFilm,
  showUpdateFilmForm,
  updateFilm,
  deleteFilm,
};