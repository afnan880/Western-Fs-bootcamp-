const connection = require("./connection");
const express = require("express");
const app = express();
const port = process.env.APPPORT;

app.get("/departments", (req, res) => {
  connection.query("SELECT * from departments", (err, rows) =>{
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    return res.json(rows);
  });
 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});