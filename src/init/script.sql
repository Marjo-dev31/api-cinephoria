CREATE DATABASE IF NOT EXISTS cinephoriadb;

USE cinephoriadb;

CREATE TABLE country (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE cinema (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    city VARCHAR(255) NOT NULL,
    country_id VARCHAR(36),
    FOREIGN KEY (country_id) REFERENCES country(id) ON DELETE CASCADE
);

CREATE TABLE priceList (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE projection_quality (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    quality VARCHAR(255) NOT NULL,
    price_id VARCHAR(36),
    FOREIGN KEY (price_id) REFERENCES priceList(id) ON DELETE CASCADE
);

CREATE TABLE room (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    number INT NOT NULL,
    numberOfSeats INT,
    projection_quality_id VARCHAR(36),
    cinema_id VARCHAR(36),
    FOREIGN KEY (projection_quality_id) REFERENCES projection_quality(id) ON DELETE CASCADE,
    FOREIGN KEY (cinema_id) REFERENCES cinema(id) ON DELETE CASCADE
);

CREATE TABLE genre (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL
);

CREATE TABLE role (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL, 
    id_role VARCHAR(36),
    FOREIGN KEY (id_role) REFERENCES role(id) ON DELETE SET NULL
);

CREATE TABLE movie (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_Url VARCHAR(255) NOT NULL,
    minimum_Age INT,
    is_Favorite BOOLEAN DEFAULT(false),
    created_At DATE,
    genre_id VARCHAR(36) NULL,
    FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE SET NULL
);

CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    description VARCHAR(255) NOT NULL,
    grade INT,
    is_Validated BOOLEAN DEFAULT(false),
    user_id VARCHAR(36) NULL,
    movie_id VARCHAR(36) ,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE SET NULL
);

CREATE TABLE showing (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    date DATE,
    start_At TIME,
    end_At TIME,
    movie_id VARCHAR(36),
    room_id VARCHAR(36),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE SET NULL,
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
);

CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    quantity INT,
    total DECIMAL(10,2),
    showing_id VARCHAR(36),
    user_id VARCHAR(36),
    FOREIGN KEY (showing_id) REFERENCES showing(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE seat (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    number INT,
    accessible BOOLEAN,
    reserved BOOLEAN,
    showing_id VARCHAR(36),
    order_id VARCHAR(36),
    FOREIGN KEY (showing_id) REFERENCES showing(id) ON DELETE SET NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

CREATE TABLE incident (
    id VARCHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    description VARCHAR(255) NOT NULL,
    date DATE,
    room_id VARCHAR(36),
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
);