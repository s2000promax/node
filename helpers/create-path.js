const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../views', `${page}.ejs`);

const handleError = (res, error) => {
  res.statusCode(500).send(error.message);
};

module.exports = { createPath, handleError };
