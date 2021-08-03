DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db; 

USE employee_db; 

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
); 

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id VARCHAR(30)
    -- FOREIGN KEY (department_id) REFERENCES department(id)
    -- ON DELETE SET NULL
); 

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id VARCHAR(30), 
    manager_id VARCHAR(30) 
    -- index role_index(role_id),
    -- index manager_index(manager_id),
    -- FOREIGN KEY (manager_id) REFERENCES employee(id),
    -- FOREIGN KEY (role_id) REFERENCES role(id) 
    -- ON DELETE SET NULL 
);