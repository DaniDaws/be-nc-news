const {
  fetchTopics,
  selectArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleVotes,
  deleteCommentByCommentId,
  fetchUsers,
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
  const { topic } = req.query;
  fetchAllArticles(topic)
    .then((articles) => {
      if (articles.length === 0 && topic) {
        return res.status(404).send({ msg: "Not Found" });
      }
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

  updateArticleVotes(article_id, newVotes)
    .then((updatedArticle) => {
      res.status(200).json({ article: updatedArticle });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({ msg: "Not Found" });
      }
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch(next);
};
