const express = require("express");
const {
  getTopics,
  getEndpoints,
  getArticleById,
} = require("./controllers/controllers");
const app = express();

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.use((req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
