const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 4001;

const server = http.createServer((request, response) => {
  console.log('Server request');
  console.log(request.url, request.method);

  response.setHeader('Content-Type', 'text/html');

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  let basePath = '';

  switch (request.url) {
    case '/':
      basePath = createPath('index');
      break;
    case '/contacts':
      basePath = createPath('contacts');
      break;
    default:
      basePath = createPath('error');
      break;
  }

  fs.readFile(basePath, (error, data) => {
    if (error) {
      console.log(error);
      response.end();
    } else {
      response.write(data);
      response.end();
    }
  });


});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
