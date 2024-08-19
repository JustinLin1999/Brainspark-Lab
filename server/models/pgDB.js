require("dotenv").config({ path: './.env.local' });
const pg = require('pg');
const { Pool } = pg;

const PG_URI = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Export object that contains query property, a function that returns the invocation of pool.query() after logging the query
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
