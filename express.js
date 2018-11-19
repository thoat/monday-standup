const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const compression = require('compression');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

// set up database connection
const SELECT_ALL_MEMBERS_QUERY = 'SELECT * FROM members;';
const client = new Client({
  // user: 'thoa1',
  // password: '20181118SUN',
  // database: 'standup_db',
  // port: 5432,
  connectionString: 'postgres://thoa1:20181118SUN@localhost:5433/standup_db',
  // connectionString: 'postgres://igefxcolofqbpj:c84ca1c7adac8b0207a4dd00106d74d66cbb2bb8fe3b38701f2adef800ba86ea@ec2-184-72-221-2.compute-1.amazonaws.com:5432/de4hacgbeomvqq',
});

app.get('/api/members', (request, response) => {
  const data = [];
  client.connect()
    .then(client.query(SELECT_ALL_MEMBERS_QUERY, (err, res) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(typeof res.rows); // object, hence can't use Array.prototype.map
      res.rows.forEach(row => data.push(row));
      console.log(data);
      console.log(typeof data);
      client.end();
    })).then(response.json(data));
});
// .catch((err) => { throw err; });

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
