const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.mode");
const router = express.Router();

router.get("/movies/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().select({ title: 1 });
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { oneMovie });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findOneAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    const allCelebrities = await Celebrity.find();
    allCelebrities.forEach((eachCelebrity) => {
      if (oneMovie.cast.find((object) => object.id === eachCelebrity.id)) {
        eachCelebrity.inCast = true;
      }
    });

    res.render("movies/edit-movie", {
      oneMovie,
      allCelebrities,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:id", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(movieId, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies/" + movieId);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
