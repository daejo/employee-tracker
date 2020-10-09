//* TYPE IN TERMINAL FOR: */
// to quit mySQL ||  EXIT
// to run mySQL||  /usr/local/mysql/bin/mysql -u root -p
// to open data base ||  .open db/election.db
// to see tables of a database || .schema
// to print column headers ||  .headers on  ||  .mode column
//* INSTALL PACKAGES */
// Initilizes Node.js ||  npm init --y
// Creates .gitignore and adds node_modules inside ||  echo "node_modules/" > .gitignore
// Installs express ||  npm install express
// Installs jest ||  npm install jest --save-dev

const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dwakin2008",
  database: "employee_database",
});

connection.connect(function (err) {
  if (err) throw err;

  showDept();
  showRoles();
  setTimeout(start, 1000);
});

function showDept() {
    connection.query("SELECT * FROM department", function (err, result, fields) {
        if(err) throw err;
        console.log(result);
    });
}

function showRoles(){
    connection.query("SELECT * FROM role", function (err, result, fields) {
        if(err) throw err;
        console.log(result);
    });

}

function start() {
    console.log("hello david");
}

// const express = require("express");
// //const db = require("./db/database");
// const PORT = process.env.PORT || 3001;
// const app = express();

// // EXPRESS MIDDLEWARE//
// // ======================= //
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // ======================= //

// // Default response for any other requests(Not Found) Catch all
// app.use((req, res) => {
//   res.status(404).end();
// });

// // Start server after DB connection
// db.on("open", () => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
