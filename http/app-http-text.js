const http = require('http');
const PORT = 4001;

const server = http.createServer((request, response) => {
  console.log('Server request');
  console.log(request.url, request.method);

  // response.setHeader('Content-Type', 'text/html');
  response.setHeader('Content-Type', 'application/json');

  /*
  response.write('<head><link rel="stylesheet" href="#"></head>');
  response.write('<h1>Hello from Back!! </h1>');
  response.write('<p>Hello from Back!! </p>');
  */
  const data = JSON.stringify([
    { name: "Name 1", age: 13 },
    { name: "Name 13", age: 23 },
    { name: "Name 15", age: 33 }
  ]);
  response.end(data);
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
