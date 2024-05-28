const express = require("express");
const { getTopics, getEndpoints } = require("./controllers/controllers");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.use((req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
