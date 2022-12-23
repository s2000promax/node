const express = require('express');
const path = require('path');

const app = express();
const PORT = 4001;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  // res.send('<h1>HW!!From</h1>');
  res.sendFile(createPath('index'));
});

app.get('/contacts', (req, res) => {
  // res.send('<h1>HW!!From</h1>');
  res.sendFile(createPath('contacts'));
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use((req, res) => {
  res
    .status(404)
    .sendFile(createPath('error'));
});


