const db = require("./connection")

class DB {
    constructor(db) {
        this.db = db;
    }

    // create our methods to interact with the database
    findAllEmployees() {
        return this.db.promise().query(
            "SELECT employee.id,employee.first_name,employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id =role.id LEFT JOIN department ON role.department_id=department.id; "
        );
    }
    findAllRoles() {
        return this.db.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id ;"
        )
    }
    findAllDepartments() {
        return this.db.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    }
    addDepartment(departmentName) {
        return this.db.promise().query(
            "INSERT INTO department SET ?", {name:departmentName}
        )
    }
    addRole(roleobj){
        return this.db.promise().query(
            "INSERT INTO role SET ?", roleobj  
        )
    }
    addEmployee(employee){
        return this.db.promise().query(
            "INSERT INTO employee SET ?", employee  
        )
    }
    updateEmployeeRole(employeeId, roleId){
        return this.db.promise().query(
            "UPDATE employee SET role_id = ? WHERE id= ?", [roleId,employeeId]  
        )
    }
};

module.exports = new DB(db);