-- Add data for each table in the database
USE employee_tracker_db;

INSERT INTO department(name) VALUES("HR"),("Sales"),("Customer Service"),("Attorney"),("Marketing");

INSERT INTO role(title, salary, department_id) VALUES ("Call Representative", 60000, 1),("Salesperson", 70000, 1),("Sales Lead", 75000, 1),("Media Affiliate", 75000, 1),("Legal", 100000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bobby", "Sue", 2, NULL),("Tommy", "Hillfiger", 1, NULL),("Ralph", "Wiggums", 1, NULL),("Bart", "Simpson", 1, NULL),("Mickey", "Mouse", 1, NULL);
