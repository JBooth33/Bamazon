DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bamazon Prime", "subscriptions", 99, 1000000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("bike tires", "sporting goods", 35, 48);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("sandals", "footwear", 50, 22);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("JavaScript & JQuery", "books", 25, 120);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("dog leash", "pet supplies", 35, 29);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("dog collar", "pet supplies", 20, 44);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("ski wax", "sporting goods", 24, 11);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bamazon Music", "subscriptions", 8, 1000000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("HTML & CSS", "books", 25, 146);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("bike gloves", "sporting goods", 20, 11);

SELECT * FROM products;