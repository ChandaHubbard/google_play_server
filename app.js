const express = require("express");
const morgan = require("morgan");
// const cors = require('cors');

const app = express();

app.use(morgan("common"));
// app.use(cors());

const apps = require("./playstore.js");

app.get("/apps", (req, res) => {
  const { genre = "", sort } = req.query;

  console.log(apps);
  
  if (genre) {
    console.log(genre)
    if (
      !["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(
        genre
      )
    ) {
      return res
        .status(400)
        .send("Genre must be Action, Puzzle, Strategy, Casual, Arcade, Card");
    }
  }

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  let results = apps
  .filter(app =>
    app
    .rating
    .toLowerCase()
    .includes(genre.toLowerCase()));

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;