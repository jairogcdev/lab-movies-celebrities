const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const router = express.Router();

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, ocupation, catchPhrase } = req.body;
    await Celebrity.create({ name, ocupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

router.get("/celebrities", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.get("/celebrities/:id", async (req, res, next) => {
  try {
    const oneCelebrity = await Celebrity.findById(req.params.id);
    res.render("celebrities/celebrity-details", { oneCelebrity });
  } catch (error) {
    next(error);
  }
});

router.get("/celebrities/:id/delete", async (req, res, next) => {
  try {
    await Celebrity.findOneAndRemove(req.params.id);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

router.get("/celebrities/:id/edit", async (req, res, next) => {
  try {
    const oneCelebrity = await Celebrity.findById(req.params.id);

    res.render("celebrities/edit-celebrity", {
      oneCelebrity,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/celebrities/:id", async (req, res, next) => {
  try {
    const celebrityId = req.params.id;
    const { name, ocupation, catchPhrase } = req.body;
    await Celebrity.findByIdAndUpdate(celebrityId, {
      name,
      ocupation,
      catchPhrase,
    });
    res.redirect("/celebrities/" + celebrityId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
