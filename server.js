const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

const postRouters = require('./routes/post-routes');
const contactRouters = require('./routes/contact-routes');

const { createPath } = require('./helpers/create-path');

const app = express();

const PORT = 4001;
const password = process.env.USER_DBPASS;

const db = `mongodb+srv://admin3d:${password}@cluster0.cqeuhs8.mongodb.net/node-test-database?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));



app.set('view engine', 'ejs');

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles'));
app.use(methodOverride('_method'));

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


