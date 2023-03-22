const db = require("./connection")

class DB {
    constructor(db) {
        this.db = db;
    }

    // create our methods to interact with the database
    findAllEmployees() {
        return this.db.promise().query(
            "SELECT * FROM employee;"
        );
    }
    findSingleEmployee() {
        return this.db.promise().query(
            "SELECT * FROM employee WHERE id = 1;"
        )
    }
    addDepartment(departmentName) {
        return this.db.promise().query(
            "INSERT INTO department(name) VALUES(?)", departmentName
        )
    }
};

module.exports = new DB(db);