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
); 

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id VARCHAR(30), 
    manager_id VARCHAR(30)
);