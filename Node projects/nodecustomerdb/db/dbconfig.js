const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "customer",
    password: "1234"
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}