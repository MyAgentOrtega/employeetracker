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
          console.log("department view");
          break;
        case "view all roles":
          console.log("roles view");
          break;
        case "view all employees":
          showAllEmployees();
          break;
        case "add a department":
          console.log("department view");
          break;
        case "add a role":
          console.log("role view");
          break;
        case "add an employee":
          console.log("add an employee view");
          break;
          case "update an employee role":
            console.log("employee role view");
            break;
        default:
          console.log("default view");
          break;
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
      db.addDepartment(response.name);
      // then display all the departments
    });
}

promptChoices();
