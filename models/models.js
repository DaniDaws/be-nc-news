const ENV = process.env.NODE_ENV || "development";

exports.fetchTopics = () => {
  return new Promise((resolve, reject) => {
    try {
      const topicsData = require(`${__dirname}/../db/data/${ENV}-data/topics.js`);
      resolve(topicsData);
    } catch (err) {
      reject(err);
    }
  });
};
