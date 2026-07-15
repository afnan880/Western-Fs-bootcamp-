const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

console.log("DATABASEHOST:", process.env.DATABASEHOST);
console.log("DATABASEUSER:", process.env.DATABASEUSER);
console.log("Password:", process.env.PASSWORD);
console.log("Database:", process.env.DATABASE);
console.log("Port:", process.env.PORT);


var con = mysql.createConnection({
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
