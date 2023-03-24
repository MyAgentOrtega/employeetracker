const inquirer = require("inquirer");

const db = require("./db");

function promptChoices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "Please select an option.",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answer) => {
      console.table(answer);
    //   if (answer.selection === "view all departments") {
    //     showAllEmployees();
    //   } else if (answer.selection === "Show one employee") {
    //     // logic for show one employee
    //   }

      switch (answer.selection) {
        case "view all departments":
          viewAllDepartments();
          break;
        case "view all roles":
          viewAllRoles();
          break;
        case "view all employees":
          showAllEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
          case "update an employee role":
            updateEmployee();
            break;
        default:
          quit();
      }
    });
}

function showAllEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => promptChoices());
}
function viewAllRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => promptChoices());
}
function viewAllDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => promptChoices());
}
function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      db.addDepartment(response.name)
      .then(()=>console.log("added department to database"))
      // then display all the departments
    });
}
function addRole() {
  db.findAllDepartments() 
  .then(([rows])=>{
    let departments = rows
    const departmentChoices = departments.map(({id,name})=>({
name:name, 
value:id

    }))
    
  })
}

promptChoices();
