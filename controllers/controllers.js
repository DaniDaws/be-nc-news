const {
  fetchTopics,
  selectArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleVotes,
  deleteCommentByCommentId,
  fetchUsers,
  checkTopicExists,
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
  const { topic, sort_by = "created_at", order = "DESC" } = req.query;
  const validSortByColumns = [
    "title",
    "author",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrderValues = ["ASC", "DESC"];

  const sortByColumn = sort_by.toLowerCase();
  const orderValue = order.toUpperCase();

  if (sort_by && !validSortByColumns.includes(sortByColumn)) {
    return next({ status: 400, msg: "Bad Request: Invalid sort_by column" });
  }

  if (order && !validOrderValues.includes(orderValue)) {
    return next({ status: 400, msg: "Bad Request: Invalid order value" });
  }

  fetchAllArticles(topic, sortByColumn, orderValue)
    .then((articles) => {
      if (articles.length === 0 && topic) {
        return checkTopicExists(topic).then((exists) => {
          if (!exists) {
            return res.status(404).send({ msg: "Not Found" });
          }
          return res.status(200).json({ articles: [] });
        });
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
