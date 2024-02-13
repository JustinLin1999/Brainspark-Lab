const express = require('express');
const app = express();
const path = require('node:path');

// uncomment the below for proxy challenge
// const leaderList = [
//   {name: 'Anna', id: 'a0'},
//   {name: 'Ben', id: 'b0'},
//   {name: 'Clara', id: 'c0'},
//   {name: 'David', id: 'd0'},
// ];

// app.get('/api/leaders', (req, res) => {
//   return res.status(200).send(leaderList);
// });
console.log(app.settings.env);
if (app.settings.env === 'production'){
  // statically serve everything in the build folder on the route '/build'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}
app.listen(3000); //listens on port 3000 -> http://localhost:3000/
