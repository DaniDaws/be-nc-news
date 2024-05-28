const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};

exports.fetchEndpoints = () => {
  return new Promise((resolve, reject) => {
    try {
      const endpoints = require("../endpoints.json");
      resolve(endpoints);
    } catch (err) {
      reject(err);
    }
  });
};
