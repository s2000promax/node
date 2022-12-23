const express = require('express');
const path = require('path');

const app = express();
const PORT = 4001;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.set('view engine', 'ejs');

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  const title = 'Home';
  // res.send('<h1>HW!!From</h1>');
  // res.sendFile(createPath('index'));
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
  res.render(createPath('post'), { title });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  res.render(createPath('posts'), { title });
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


