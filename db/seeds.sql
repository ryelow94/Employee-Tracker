INSERT INTO department (id, name) 
VALUES ( 001, "Accounting"); 

INSERT INTO role (title, salary, department_id) 
VALUES ("Accountant", 50000, "Accounting"); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("John", "Doe", "Accountant" , "Tom" );