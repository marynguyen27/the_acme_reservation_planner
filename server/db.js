const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL ||
    'postgres://postgres:12345678@localhost/acme_travel_db'
);

module.exports = {
  client,
};
