const mysql = require("mysql2")

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Tangerine13!',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );
module.exports = db;