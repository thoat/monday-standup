require('dotenv').config();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const compression = require('compression');
const express = require('express');
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
  const bd = request.body;
  // check if body object is empty. Credit: https://stackoverflow.com/a/32108184
  if (Object.keys(bd).length === 0 && bd.constructor === Object) {
    response.send({ msg: 'Invalid request: empty body.' });
  } else {
    const { id, memberName, team } = bd;
    const INSERT_QUERY = `INSERT INTO members (rowid, name, team) VALUES ('${id}', '${memberName}', '${team}');`;
    const db = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    db.connect()
      .then(db.query(INSERT_QUERY, (err) => {
        if (err) response.send({ msg: 'Error incurred. Change is not saved to backend.' });
        else response.send({ msg: 'Data added successfully!' });
      }));
  }
});


const prod = process.env.NODE_ENV === 'production';
if (prod) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, 'build')));
  app.get('*', (res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
} else {
  app.use(morgan('dev'));
  // app.use(express.static(path.resolve(__dirname, 'public')))
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  // })
}

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}...`));
