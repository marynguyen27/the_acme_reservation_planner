const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL ||
    'postgres://postgres:12345678@localhost:5432/acme_reservations'
);

module.exports = {
  client,
};
