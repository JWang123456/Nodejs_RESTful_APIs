const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: String
});

const Genre = mongoose.model("Genre-Collection", genreSchema);

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort({ name: -1 });
  res.send(genre);
});

router.post("/", async (req, res) => {
  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;