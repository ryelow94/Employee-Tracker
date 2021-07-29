const inquirer = require("inquirer") 
const mysql = require("mysql2") 

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
    addRole(){
        console.log("addRole")
    }, 
    addDepartment(){}, 
    addEmployee(){}, 
    updateEmployee(){},
    viewDepartment(){db.query("SELECT * FROM department", function (err, results) {
        console.log(results)
    })
    },
    viewRole(){db.query("SELECT * FROM role", function (err, results) {
        console.log(results)
    })
    }, 
    viewEmployees(){db.query("SELECT * FROM employee", function (err, results) {
        console.log(results)
    })
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
          'viewDepartments',
          'viewRoles',
          'viewEmployees',
          'addDepartment',
          'addRole',
          'addEmployee',
          'updateEmployeeRole',
        ],
        name: 'action',
      },
    ]);
  };
  function promptToContinue() {
    return inquirer.prompt([
      {
        type: 'confirm',
        message: 'do you want to continue',
        name: 'continuePrompt',
      },
    ]);
  }