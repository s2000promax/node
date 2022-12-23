const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../views', `${page}.ejs`);

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

module.exports = { createPath, handleError };
