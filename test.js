
const inquirer = require("inquirer");
var arr = ["bob", "dawn", "sarah", "ginny"];

switch (arr[0]) {
  case "bob":
    console.log("bob the tomatoe");
break;
  case "sarah":
    console.log("sarah has a dog");
    break;
  default:
    console.log("jingle bel;ls");
    break
}

inquirer.prompt([
    {
        type: "list",
        name: "selection",
        message: "Please select an option.",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role"]
    },
    {
        type: "list",
        name: "sandiage",
        message: "Please select an option.",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role"]
    },
    {
        type: "list",
        name: "joel",
        message: "Please select an option.",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role"]
    },
    {
        type: "list",
        name: "billy",
        message: "Please select an option.",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role"]
    }
]).then(answer => {
    console.table(answer)
    // if(answer.selection === 'view all departments') {
    //     showAllEmployees();
    // } else if (answer.selection === 'Show one employee') {
    //     // logic for show one employee
    // }

    
})
