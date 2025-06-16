const mysql = require("mysql2/promise");

// IMPORTANT: Replace these placeholders with your actual database credentials
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "kevasiya",
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
