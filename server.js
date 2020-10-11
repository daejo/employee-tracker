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
                'View all departments',
                'View all roles',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role']
        })
        .then(function(response) {
            switch (response.main) {
                case 'View all employees':
                    connection.query("SELECT * FROM employee", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                        start();
                    });
                    break;
                case 'View all departments':
                    connection.query("SELECT * FROM department", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                    });
                    break;
                case 'View all roles':
                    connection.query("SELECT * FROM role", function (err, result, fields) {
                        if(err) throw err;
                        console.table(result);
                    });
                    break;
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                   addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update employee role':
                    updateRole();
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
        console.log('Inserting a new employee...\n');
        const query = connection.query(
        'INSERT INTO employee SET ?',
        {
        first_name: response.eFirstName,
        last_name: response.eLastName,
        role_id: response.roleId,
        manager_id: response.managerId
        },
        function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' employee inserted!\n');
        }
        );
        // logs the actual query being run
        console.log(query.sql);
        connection.query("SELECT * FROM employee", function (err, result, fields) {
            if(err) throw err;
            console.table(result);
            start();
        });
    })
}

function addDept() {
    inquirer.prompt(
        {
            type: "input",
            message: "What's the name of the new department?",
            name: "department"
        }
    ).then(function(response){
        console.log('Inserting a new department...\n');
        const query = connection.query(
        'INSERT INTO department SET ?',
        {
        name: response.department
        },
        function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department added!\n');
        }
        );
        // logs the actual query being run
        console.log(query.sql);
        connection.query("SELECT * FROM department", function (err, result, fields) {
            if(err) throw err;
            console.table(result);
            start();
        });
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the title of your new role?",
            name: "role"
        },
        {
            type: "input",
            message: "How much does this role make?",
            name: "salary"
        },
        {
            type: "input",
            message: "What's the department ID?",
            name: "deptId"
        }
    ]).then(function(response){
        console.log('Inserting a new role...\n');
        const query = connection.query(
        'INSERT INTO roles SET ?',
        {
            title: response.role,
            salary: response.salary,
            department_id: response.deptId
        },
        function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' role inserted!\n');
        }
        );
        // logs the actual query being run
        console.log(query.sql);
        connection.query("SELECT * FROM roles", function (err, result, fields) {
            if(err) throw err;
            console.table(result);
            start();
        });
    })
}

function updateRole() {
    console.log("Updating employee");
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "Enter employee id",
      })
      .then(function (response) {
        let id = response.id;
        inquirer
          .prompt({
            name: "roleId",
            type: "input",
            message: "Enter role id",
          })
          .then(function (response) {
            let roleId = response.roleId;
            let query = "UPDATE employee SET role_id=? WHERE id=?";
            connection.query(query, [roleId, id], function (err, res) {
              if (err) {
                console.log(err);
              }
              connection.query("SELECT * FROM employee", function (err, result, fields) {
                if(err) throw err;
                console.table(result);
                start();
            });
            });
          });
        });
}



