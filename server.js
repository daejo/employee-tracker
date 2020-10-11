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
        // Set global array to store department names
        let deptArr = [];
    
        // Create new connection using promise-sql
        connection.createConnection().then((conn) => {
    
            // Query just names of departments
            return connection.query('SELECT name FROM department');
        }).then(function(value){
    
            // Place all names within deptArr
            deptQuery = value;
            for (i=0; i < value.length; i++){
                deptArr.push(value[i].name);
                
            }
        }).then(() => {
    
            // Prompt user to select department from array of departments
            inquirer.prompt({
                name: "department",
                type: "list",
                message: "Which department would you like to search?",
                choices: deptArr
            })    
            .then((answer) => {
    
                // Query all employees depending on selected department
                const query = `SELECT employee.id AS ID, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
                connection.query(query, (err, res) => {
                    if(err) return err;
                    
                    // Show results in console.table
                    console.log("\n");
                    console.table(res);
    
                    // Back to main menu
                    mainMenu();
                });
            });
        });
    
}


