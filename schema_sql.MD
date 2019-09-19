DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

DROP TABLE IF EXISTS people;

CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

INSERT INTO people (first_name, last_name) VALUES ('bob','dylan');

-- theoretically would run psql -f schema.sql to load this file and run all these things

------------------------------------------


PG is library  we use to talk to PostgreSQL. 

let sql = 'INSERT INTO people first_name, last_name) values ($1, $2);'

- selects everyghing from the people table

let safeValues = ['bob','dylan'];
 

client.query(sql, safeValues).then().catch()

// does the input sanitization for us