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
CREATE TABLE Full_list (
  id INTEGER (11) AUTO_INCREMENT NOT NULL,
  item VARCHAR (255),
  price_USD DECIMAL(10,4),
  qty_available INTEGER (10),
  department VARCHAR (255),
  PRIMARY KEY (id)
)
;