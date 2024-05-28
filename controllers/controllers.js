const {
  fetchTopics,
  selectArticleById,
  selectAllArticles,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleVotes,
} = require("../models/models");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).json({ topics });
    })
    .catch(next);
};

exports.getEndpoints = (req, res, next) => {
  const endpoints = require("../endpoints.json");
  return res.status(200).json(endpoints);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(article_id)) {
    return next({ status: 400, msg: "Bad Request" });
  }
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  selectAllArticles()
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(article_id)) {
    return next({ status: 400, msg: "Bad Request" });
  }
  selectArticleById(article_id)
    .then(() => fetchCommentsByArticleId(article_id))
    .then((comments) => {
      res.status(200).json({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res.status(400).send({ msg: "Bad Request" });
  }

  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { newVotes } = req.body;

  if (isNaN(article_id)) {
    return next({ status: 400, msg: "Bad Request" });
  }

  if (typeof newVotes !== "number") {
    return next({ status: 400, msg: "Bad Request" });
  }

  updateArticleVotes(article_id, newVotes)
    .then((updatedArticle) => {
      res.status(200).json({ article: updatedArticle });
    })
    .catch(next);
};
