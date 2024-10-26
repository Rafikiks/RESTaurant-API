-- DROP TABLE IF EXISTS restaurant_database;
-- CREATE DATABASE restaurant_database;
-- USE restaurant_database;

CREATE TABLE `items` (
	`id_item` int AUTO_INCREMENT,
	`categorie_name` varchar(50) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` varchar(50) NOT NULL,
	`price` FLOAT NOT NULL,
  PRIMARY KEY (`id_item`)
);
INSERT INTO `items` VALUES ('1','Starters','Greek Salad','Lorem ipsum dolor sit amet',5.00);
INSERT INTO `items` VALUES ('2','Starters','Tortilla Espanola','Lorem ipsum dolor sit amet',4.50);
INSERT INTO `items` VALUES ('3','Starters','Olivas Rellenas','Lorem ipsum dolor sit amet',6.00);
INSERT INTO `items` VALUES ('4','Starters','Verduras Con Olivada','Lorem ipsum dolor sit amet',6.50);
INSERT INTO `items` VALUES ('5','Starters','Lasagne','Lorem ipsum dolor sit amet',3.00);

INSERT INTO `items` VALUES ('6','Mains','Lenguado','Lorem ipsum dolor sit amet',12.00);
INSERT INTO `items` VALUES ('7','Mains','Bacalao Frito','Lorem ipsum dolor sit amet',7.00);
INSERT INTO `items` VALUES ('8','Mains','Paella Mixta','Lorem ipsum dolor sit amet',8.50);
INSERT INTO `items` VALUES ('9','Mains','Lomo de Salmon','Lorem ipsum dolor sit amet',11.50);
INSERT INTO `items` VALUES ('10','Mains','Pollo al Horno','Lorem ipsum dolor sit amet',8.00);

INSERT INTO `items` VALUES ('11','Drinks','Ice Tea','',2.50);
INSERT INTO `items` VALUES ('12','Drinks','Bottled Water','',1.50);
INSERT INTO `items` VALUES ('13','Drinks','Beer','',2.00);

CREATE TABLE `categories` (
	`id_categorie` int AUTO_INCREMENT,
	`categorie_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categorie`)
);
INSERT INTO `categories` VALUES ('1','Starters');
INSERT INTO `categories` VALUES ('2','Mains');
INSERT INTO `categories` VALUES ('3','Drinks');

CREATE TABLE `formulas` (
	`id_formula` int AUTO_INCREMENT,
	`formula_name` varchar(50) NOT NULL,
    `categorie_name` varchar(50) NOT NULL,
    `price` FLOAT NOT NULL,
  PRIMARY KEY (`id_formula`)
);
INSERT INTO `formulas` VALUES ('1','Classic','Starter & Main',15.00);
INSERT INTO `formulas` VALUES ('2','Full Pack','Starter & Main & Dessert',20.00);
