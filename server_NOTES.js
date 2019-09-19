'use estrict';

const express = require('express');
require('dotenv').config();
require('cors').config();
const pg = require('pg');

// PG is library  we use to talk to PostgreSQL

const app = express();

const PORT = process.env.PORT || 3000;


// routes

app.get('/', (request, response) => {
  response.status(200).send('alive here');
});

app.use('*', (request, response) => {
  response.statys(404).send('These are not the droids youre looking for');
})


app.get('/add', (request, response) => {
  let firstName = request.query.first;
  let lastName = request.query.last;

  //save info in db

  let sql = 'INSERT INTO people (first_name, last_name) VALUES ($1, $2);';
  let value = [firstName, lastName];
  client.query(sql, value)

    .then (pgResults => {
      response.status(200).json(pgResults);
    })

    .catch(error => errorHandler(error));



})

// ------- connect to the database

const client = new pg.Client(process.env.DATABASE_URL);
// mac = DATABASE_URL=postgress://localhost:5432/name-of-database
// pc = DATABASE_URL=postgress://<username>:<password>@localhost:5432/name-of-database


client.on('error', err => console.error(err));


app.use(errorHandler);

function errorHandler(error, request, response) {
  // missed this part
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  })
  .catch(error => errorHandler(error));

// actually activate this thing
