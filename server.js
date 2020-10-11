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
  database: "employee"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("START");
  setTimeout(start, 1000);
});

function start() {
    console.log("");
    inquirer.prompt(
        {
            type: 'list',
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
                    connection.query("SELECT * FROM employee", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                    });
                    break;
                case 'View all employees by department':
                    viewByDept();
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

function viewByDept() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'dept',
            message: 'Which department do you want to view?',
            choices: [
                'Sales',
                'Engineering',
                'Finance',
                'Legal']
        }).then(function(response) {
            switch (response.dept) {
                case 'Sales':
                    
                break;

                case 'Engineering':
                
                break;

                case 'Finance':
                
                break;

                case 'Legal':
                
                break;
            }
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the first name of the employee?",
            name: "eFirstName"
        },
        {
            type: "input",
            message: "What's the last name of the employee?",
            name: "eLastName"
        },
        {
            type: "input",
            message: "What's the employee's role id number?",
            name: "roleId"
        },
        {
            type: "input",
            message: "What is the manager id number?",
            name: "managerId"
        }
    ]).then(function(response){
        connection.query("INSERT INTO employee (first_name, last_name, manager_id) VALUES (?, ?, ?, ?)", [response.eFirstName, response.eLastName, response.roleId, response.managerId], function(err,res){
            if (err) throw err;
            console.table(res);
            start();
        })
    })
}


