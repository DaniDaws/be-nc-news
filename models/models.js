exports.fetchTopics = () => {
  const ENV = process.env.NODE_ENV || "development";
  return new Promise((resolve, reject) => {
    try {
      const topicsData = require(`${__dirname}/../db/data/${ENV}-data/topics.js`);
      resolve(topicsData);
    } catch (err) {
      reject(err);
    }
  });
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
