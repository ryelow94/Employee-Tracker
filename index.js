const inquirer = require("inquirer") 
const mysql = require("mysql2") 
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Candlezebra123!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
  ); 

const options = { 
      viewDepartment(){db.query("SELECT * FROM department", function (err, results) { 
        console.table(results)
    })
  },
      viewRole(){db.query("SELECT * FROM role", function (err, results) {
      console.table(results)
      })
    }, 
      viewEmployees(){db.query("SELECT * FROM employee", function (err, results) {
        console.table(results)
      })
    },
    async addRole(){ 
      let response = await inquirer.prompt([
      {
        type: "input",
        message: "Which role would you like to add?",
        name: "newRole"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "newRoleSalary"
      },
      {
        type: "input",
        message: "What is the department for this role?",
        name: "newRoleDepartment"
      },
    ]);
    db.query(`INSERT INTO role SET title = ?, salary = ?, department_id = ?`, [response.newRole, response.newRoleSalary, response.newRoleDepartment]),
    db.query("SELECT * FROM role", function (err, results) { 
      if (err) { console.log(err)
      } else {console.table(results) 
    }})
    }, 
    async addDepartment(){
      let response = await inquirer.prompt([
        {
          type: "input",
          message: "Which department would you like to add?",
          name: "newDepartment"
        }
      ]) 
      db.query(`INSERT INTO department SET name = ?`, response.newDepartment)
          db.query("SELECT * FROM department", function (err, results) { 
            if (err) { console.log(err)
            } else {console.table(results) 
          }})
    },
    async addEmployee(){ 
      let response = await inquirer.prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "employeeFirstName"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "employeeLastName"
        },
        {
          type: "input",
          message: "What is the employee's role?", 
          name: "employeeRole"
        }, 
        {
          type: "input",
          message: "What is the employee's manager's name?",
          name: "employeeManager"
        },
      ]);
      db.query(`INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?`, [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager]),
      db.query("SELECT * FROM employee", function (err, results) { 
        if (err) { console.log(err)
        } else {console.table(results) 
      }})
      }, 
     async updateEmployee(){ 
      let response = await inquirer.prompt([
        {
          type: "input",
          message: "What is the employee's id you would like to update?",
          name: "employeeId"
        },
        {
          type: "input",
          message: "What is the employee's new role",
          name: "employeeUpdateRole"
        },
      ]);
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [response.employeeUpdateRole, response.employeeId]),
        function (error, res) {
          if (error) throw error;
        };
    },
};  

runApp()

async function runApp() {
    const {action} = await dataBaseAction();
    await options[action]();
    const answer = await promptToContinue();
    if (answer.continuePrompt) {
        runApp();
    } else {
      console.log('Goodbye');
      return '';
    }
    return '';
  }

function dataBaseAction () {
    return inquirer.prompt([
      {
        type: 'list',
        message: 'Which of the following would you like to do',
        choices: [
          'viewDepartment',
          'viewRole',
          'viewEmployees',
          'addDepartment',
          'addRole',
          'addEmployee',
          'updateEmployee',
        ],
        name: 'action',
      },
    ]);
  };
  function promptToContinue() {
    return inquirer.prompt([
      {
        type: 'confirm',
        message: 'Do you want to continue?',
        name: 'continuePrompt',
      },
    ]);
  }