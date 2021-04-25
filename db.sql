/*Setup db*/
CREATE DATABASE `adc_db`;
ALTER DATABASE adc_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER adc@locahost IDENTIFIED BY "123";
GRANT ALL PRIVILEGES ON adc_db.* TO adc@localhost;
use `adc_db`;

CREATE TABLE `users`(
    `id`            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `email`         VARCHAR(70) UNIQUE,
    `password`      CHAR(64)
);

CREATE TABLE `connections`(
    `id`            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `uid`           INT UNSIGNED,
    `session`       CHAR(64) UNIQUE,
    `token`         CHAR(64),
    FOREIGN KEY (`uid`) REFERENCES `users` (id) ON DELETE CASCADE
);


CREATE TABLE `interfaces`(
    `id`            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `value`         VARCHAR(255)
);
CREATE TABLE `archs`(
    `id`            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `value`         VARCHAR(255)
);

CREATE TABLE ADC(
    `id`            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `model`             VARCHAR(255) UNIQUE,
    `image`             VARCHAR(64),
    `description`       TEXT,
    `cxeme`             VARCHAR(64),
    `tech`              VARCHAR(64),
    `resolution`        DECIMAL(3, 1) UNSIGNED DEFAULT 4.5,
    `channels`          INT(2)        UNSIGNED DEFAULT 1,
    `max_sample_rate`   DECIMAL(11,6) UNSIGNED DEFAULT 1,
    `interface`         INT           UNSIGNED DEFAULT 1,
    `arch`              INT           UNSIGNED DEFAULT 1,
    `max_INL`           DECIMAL(10,4) UNSIGNED DEFAULT 1,
    `SNR`               DECIMAL(5,2)           DEFAULT 1,
    `SFDR`              DECIMAL(5,2)           DEFAULT 1,
    `power`             DECIMAL(9,4)  UNSIGNED DEFAULT 1,
    `temperature`       DECIMAL(5,2)           DEFAULT 1,
    `analog_input`      DECIMAL(7,3)  UNSIGNED DEFAULT 1,
    `FoMW`              DECIMAL(8,3)  UNSIGNED DEFAULT 1,
    `max_DNL`           DECIMAL(5,2)           DEFAULT 1,
    FOREIGN KEY (`interface`) 
            REFERENCES `interfaces` (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`arch`) 
            REFERENCES `archs` (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    FULLTEXT            (`description`)
);
/*
Добавить первого пользователя
*/
INSERT INTO `users` SET `email`="admin@example.com", `password`='81d40d94fee4fb4eeb1a21bb7adb93c06aad35b929c1a2b024ae33b3a9b79e23';