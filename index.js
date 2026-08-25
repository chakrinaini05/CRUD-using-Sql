const express = require("express");

const mysql = require("mysql2");

const path = require("path");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const port = 8080;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "demo_db",
  password: "2005",
}); //creates a connection object

connection.connect((err) => {
  if (err) {
    console.log("there is a err");
    return;
  }

  console.log("Connection established");
}); //tries to connect it with the db and checks whether established or not

app.listen(port, () => {
  console.log("The server is running");
});

//count of data using get req
app.get("/", (req, res) => {
  try {
    connection.query("select count(*) as count from tb", (err, result) => {
      if (err) {
        console.log("there is a error");
        return;
      }

      let count = result[0].count;
      res.render("home", { count: count });
      console.log(count);
    });
  } catch {
    console.log("there is a outer error");
  }
});
