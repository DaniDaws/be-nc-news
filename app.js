const express = require("express");
const cors = require("cors");
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleVotes,
  deleteComment,
  getUsers,
} = require("./controllers/controllers");
const app = express();

app.use(cors());

app.use(express.json());

app.delete("/api/comments/:comment_id", deleteComment);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api", getEndpoints);

app.use((req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
