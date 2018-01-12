-- Drops the bamazon data base in if it currently exists
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  id INTEGER (11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR (255),
  department_name VARCHAR (255),
  price INTEGER (30),
  stock_qty INTEGER (11),
  PRIMARY KEY (id)
)
;

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES
("Crib", "Baby", 122, 20);
("Onesie", "Baby", 8, 50);
("Blanket", "Baby", 12, 75);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES
("Rake", "Hardware", 10, 40);
("Broom", "Hardware", 9, 50);
("Yard Bags", "Hardware", 7, 100);