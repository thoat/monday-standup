require('dotenv').config();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();
// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

const SELECT_ALL_MEMBERS_QUERY = 'SELECT * FROM members;';

app.get('/members', (request, response) => {
  const db = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  db.connect()
    .then(db.query(SELECT_ALL_MEMBERS_QUERY, (err, res) => {
      if (err) throw err;
      response.send(res.rows);
      db.end(); // when to?
    }));
});

// // create application/text parser
// const textParser = bodyParser.text({ type: 'text/plain' });

// // POST /update gets text bodies. Test this in Postman extension
// app.post('/update', textParser, (req, res) => {
//   // console.log(req.body);
//   fs.writeFile('./src/data.js', req.body, (err) => {
//     if (err) res.send({ message: 'Could not update data' });
//     else res.send({ message: 'Data updated!' });
//   });
// });


// const prod = app.get('env') === 'production';
// if (prod) {
//   app.disable('x-powered-by');
//   app.use(compression());
//   app.use(morgan('common'));
//   app.use(express.static(path.resolve(__dirname, 'build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   });
// } else {
//   app.use(morgan('dev'));
//   // app.use(express.static(path.resolve(__dirname, 'public')))
//   // app.get('*', (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
//   // })
// }

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}...`));
