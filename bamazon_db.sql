-- Drops the bamazon data base in if it currently exists
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE Baby (
  id INTEGER (11) AUTO_INCREMENT NOT NULL,
  item VARCHAR (255),
  price DECIMAL(10,4),
  qty_available INTEGER (10),
  department VARCHAR (255),
  PRIMARY KEY (id)
)
;

CREATE TABLE Toy (
  id INTEGER (11) AUTO_INCREMENT NOT NULL,
  item VARCHAR (255),
  price DECIMAL(10,4),
  qty_available INTEGER (10),
  department VARCHAR (255),
  PRIMARY KEY (id)
)
;

CREATE TABLE Women (
  id INTEGER (11) AUTO_INCREMENT NOT NULL,
  item VARCHAR (255),
  price DECIMAL(10,4),
  qty_available INTEGER (10),
  department VARCHAR (255),
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

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES
("Red Shoes", "Women", 50, 100);
("Black Shoes", "Women", 40, 125);
("White Shoes", "Women", 35, 100);