const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
              COUNT(comments.comment_id) ::INT AS comment_count
       FROM articles
       LEFT JOIN comments ON comments.article_id = articles.article_id
       WHERE articles.article_id = $1
       GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows[0];
    });
};

exports.fetchAllArticles = (topic, sort_by = "created_at", order = "DESC") => {
  let queryStr = `
    SELECT articles.*, COUNT(comments.article_id) ::INT AS comment_count 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
  `;

  const queryParams = [];

  if (topic) {
    queryStr += ` WHERE articles.topic = $1`;
    queryParams.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id 
                ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, queryParams).then((result) => result.rows);
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id
         FROM comments
         WHERE article_id = $1
         ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  const query = `
      INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

  return db.query(query, [article_id, username, body]).then(({ rows }) => {
    return rows[0];
  });
};

exports.updateArticleVotes = (article_id, newVotes) => {
  return db
    .query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *;`,
      [newVotes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows[0];
    });
};

exports.deleteCommentByCommentId = (comment_id) => {
  return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [
    comment_id,
  ]);
};

exports.fetchUsers = () => {
  return db
    .query("SELECT username, name, avatar_url FROM users;")
    .then((result) => result.rows);
};

exports.checkTopicExists = (topic) => {
  return db
    .query("SELECT 1 FROM topics WHERE slug = $1;", [topic])
    .then(({ rows }) => {
      return rows.length > 0;
    });
};
