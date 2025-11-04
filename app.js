const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side!');
  res.status(200).json({ message: 'Hello from server side!', methode: 'get' });
});
app.post('/', (req, res) => {
  // res.send('Send');

  // res.status(404).json({ message: '404 from server', methode: 'post' });
  res.status(200).json({ message: 'Hello world from server', methode: 'post' });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
