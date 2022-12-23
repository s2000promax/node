const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/post');

const app = express();

const PORT = 4001;
const password = process.env.USER_DBPASS;

const db = `mongodb+srv://admin3d:${password}@cluster0.cqeuhs8.mongodb.net/node-test-database?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.set('view engine', 'ejs');

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube1', link: 'http://youtube.com' },
    { name: 'YouTube2', link: 'http://youtube.com' },
    { name: 'YouTube3', link: 'http://youtube.com' },
    { name: 'YouTube4', link: 'http://youtube.com' }
  ];

  res.render(createPath('contacts'), { title, contacts });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';

  const post = {
    id: 1,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    title: 'Post title',
    date: '12.06.2022',
    author: 'Stan',
  };

  res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';

  const posts = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
      title: 'Post title',
      date: '12.06.2022',
      author: 'Stan',
    }
  ];
  res.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, res) => {
  const  { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post.save()
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    })
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';
  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = 'Error page';
  res
    .status(404)
    .render(createPath('error'), { title });
});


