const { fetchTopics } = require("../models/models");

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
