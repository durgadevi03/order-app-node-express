-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema test_order
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test_order
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test_order` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `test_order` ;

-- -----------------------------------------------------
-- Table `test_order`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_order`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_order`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_order`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `payment_id` VARCHAR(255) NOT NULL,
  `payer_id` INT(11) NOT NULL,
  `payment_total` FLOAT NOT NULL,
  `created_at` TIMESTAMP(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `payment_id_UNIQUE` (`payment_id` ASC) VISIBLE,
  INDEX `fk_orders_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `test_order`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_order`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_order`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` FLOAT NOT NULL,
  `description` TEXT NOT NULL,
  `currency` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_order`.`order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_order`.`order_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  PRIMARY KEY (`id`, `order_id`, `product_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_orders_has_products_products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_order_items_orders1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_items_orders1`
    FOREIGN KEY (`order_id`)
    REFERENCES `test_order`.`orders` (`id`),
  CONSTRAINT `fk_order_items_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `test_order`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
