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
          updateEmployeeRole();
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
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      db.addDepartment(response.name).then(() => viewAllDepartments());
      // then display all the departments
    });
}
async function addRole() {
  const [departments] = await db.findAllDepartments()
  const departmentArray = departments.map(department =>({name:department.name,value:department.id}))
  inquirer.prompt([
    {
      type:"input",
      name:"title",
      message:"What role would you like to add?",

    },
    {
      type:"input",
      name:"salary",
      message:"What is the salary for this role?",
    },
    {
      type:"list",
      name:"department_id",
      message:"What department does this role belong to?",
      choices:departmentArray,
    }

  ]).then((response) => {
    const roleobj = {title:response.title,salary:response.salary,department_id:response.department_id}
    db.addRole(roleobj).then(() => viewAllRoles())
  })
}
async function addEmployee() {
  const [roles] = await db.findAllRoles()
  const roleArray = roles.map(role =>({name:role.title,value:role.id}))
  const [employees] = await db.findAllEmployees()
  const employeeArray = employees.map(employee =>({name:employee.first_name + " " + employee.last_name,value:employee.id}))
const managerArray = [...employeeArray,{name:"None",value:null}]
inquirer.prompt([
  {
    type:"input",
    name:"first_name",
    message:"What is the employee's first name?",
  },
  {
    type:"input",
    name:"last_name",
    message:"What is the employee's last name?",
  },
  {
    type:"list",
    name:"role_id",
    message:"What is the employee's role?",
    choices:roleArray,
  },
  {
    type:"list",
    name:"manager_id",
    message:"Who is the employee's manager?",
    choices:managerArray,
  }
]).then(({first_name,last_name,role_id,manager_id}) => {
  const employeeobj = {first_name,last_name,role_id,manager_id}
  db.addEmployee(employeeobj).then(() => showAllEmployees())
})


}
async function updateEmployeeRole() {
  const [employees] = await db.findAllEmployees()
  const employeeArray = employees.map(employee =>({name:employee.first_name + " " + employee.last_name,value:employee.id}))
  const [roles] = await db.findAllRoles()
  const roleArray = roles.map(role =>({name:role.title,value:role.id}))
  inquirer.prompt([
    {
      type:"list",
      name:"employee_id",
      message:"Which employee would you like to update?",
      choices:employeeArray,
    },
    {
      type:"list",
      name:"role_id",
      message:"What is the employee's new role?",
      choices:roleArray,
    }
  ]).then(({employee_id,role_id}) => {
    db.updateEmployeeRole(employee_id,role_id).then(() => showAllEmployees())
  })
}
promptChoices();
