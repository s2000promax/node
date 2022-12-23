const express = require('express');

const morgan = require('morgan');
const chalk = require('chalk');

const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

const postApiRoutes = require('./routes/api-post-routes');

const postRouters = require('./routes/post-routes');
const contactRouters = require('./routes/contact-routes');

const { createPath } = require('./helpers/create-path');
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

const PORT = process.env.USER_PORT;
const dbName = process.env.USER_DBNAME;
const password = process.env.USER_DBPASS;

const db = `mongodb+srv://admin3d:${password}@cluster0.cqeuhs8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
  .connect(db)
  .then((res) => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(error)));

app.set('view engine', 'ejs');

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles'));
app.use(methodOverride('_method'));

app.use(postApiRoutes);

app.use(postRouters);
app.use(contactRouters);

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use((req, res) => {
  const title = 'Error page';
  res
    .status(404)
    .render(createPath('error'), { title });
});


