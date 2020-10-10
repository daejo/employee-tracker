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
// Installs jest ||  npm install jest --save-dev\
///TYPE || usr/local/mysql/bin/mysql -u root -p
const mysql = require("mysql");
const inquirer = require("inquirer");
const { SearchSource } = require("jest");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dwakin2008",
  database: "employee_database"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("START");
  setTimeout(start, 1000);
});

function start() {
    console.log("hello david");
    inquirer.prompt(
        {
            type: 'checkbox',
            name: 'main',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'Add an employee',
                'Remove an employee',
                'Update employee role',
                'Update employee manager']
        })
        .then(function(response) {
            switch (response.main) {
                case 'View all employees':
                    connection.query("SELECT * FROM employees", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                    });
                    break;
                case 'View all employees by department':
                    connection.query("SELECT * FROM department", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                    });
                    break;
                case 'View all employees by manager':
                    connection.query("SELECT * FROM department", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                    });
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Remove an employee':
                    removeEmployee();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Update employee manager':
                    updateManager();
                    break;
            }
        })
}


