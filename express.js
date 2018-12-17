require('dotenv').config();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();

const SELECT_ALL_MEMBERS_QUERY = 'SELECT * FROM members;';

app.get('/api/members', (request, response) => {
  const db = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  db.connect()
    .then(db.query(SELECT_ALL_MEMBERS_QUERY, (err, res) => {
      if (err) throw err;
      response.send(res.rows);
      db.end();
    }));
});

app.delete('/api/members/:rowid', (request, response) => {
  const toDel = request.params.rowid;
  const DELETE_QUERY = `DELETE FROM members WHERE rowid = '${toDel}';`;
  const db = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  db.connect()
    .then(db.query(DELETE_QUERY, (err, res) => {
      if (err) response.send({ msg: 'Error incurred. Change is not saved to backend.' });
      else {
        const msg = res.rowCount === 0
          ? 'No matching id. No data was deleted.'
          : 'Member removed succesfully!';
        response.send({ msg });
      }
      db.end();
    }));
});

// create application/json parser
const jsonParser = bodyParser.json();

// Don't forget the parser!!!
app.post('/api/members', jsonParser, (request, response) => {
  // if (!request.body) return response.sendStatus(400);
  const { memberName, team } = request.body;
  const INSERT_QUERY = `INSERT INTO members (name, team) VALUES ('${memberName}', '${team}');`;
  const db = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  db.connect()
    .then(db.query(INSERT_QUERY, (err) => {
      if (err) response.send({ msg: 'Error incurred. Change is not saved to backend.' });
      else response.send({ msg: 'Data added successfully!' });
    }));
});


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
