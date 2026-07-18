const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();




const con = mysql.createConnection({
  host: process.env.DATABASEHOST,
  user: process.env.DATABASEUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// con.query("SELECT * from departments").on("result", function (row) {
//   console.log(row);
// });
module.exports = con;
