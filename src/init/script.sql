-- Schéma MySQL correspondant aux entités TypeORM actuelles.
CREATE DATABASE IF NOT EXISTS cinephoria;
USE cinephoria;

CREATE TABLE country (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE role (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE genre (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE price (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE cinema (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    city VARCHAR(255) NOT NULL,
    countryId VARCHAR(36) NULL,
    CONSTRAINT FK_cinema_country FOREIGN KEY (countryId) REFERENCES country(id) ON DELETE SET NULL
);

CREATE TABLE projection_quality (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    quality VARCHAR(255) NOT NULL,
    priceId VARCHAR(36) NULL,
    CONSTRAINT FK_projection_quality_price FOREIGN KEY (priceId) REFERENCES price(id) ON DELETE SET NULL
);

CREATE TABLE room (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    number INT NOT NULL,
    numberOfSeats INT NOT NULL,
    cinemaId VARCHAR(36) NOT NULL,
    projectionQualityId VARCHAR(36) NULL,
    CONSTRAINT FK_room_cinema FOREIGN KEY (cinemaId) REFERENCES cinema(id) ON DELETE CASCADE,
    CONSTRAINT FK_room_projection_quality FOREIGN KEY (projectionQualityId) REFERENCES projection_quality(id) ON DELETE SET NULL
);

CREATE TABLE movie (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_Url VARCHAR(255) NOT NULL DEFAULT '',
    minimum_Age INT NOT NULL DEFAULT 0,
    is_Favorite BOOLEAN NOT NULL DEFAULT FALSE,
    created_At DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    genreId VARCHAR(36) NULL,
    CONSTRAINT FK_movie_genre FOREIGN KEY (genreId) REFERENCES genre(id) ON DELETE SET NULL
);

CREATE TABLE user (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    roleId VARCHAR(36) NULL,
    CONSTRAINT FK_user_role FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE SET NULL
);

CREATE TABLE showing (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    date DATETIME NOT NULL,
    start_At TIME NOT NULL,
    end_At TIME NOT NULL,
    movieId VARCHAR(36) NOT NULL,
    roomId VARCHAR(36) NOT NULL,
    CONSTRAINT FK_showing_movie FOREIGN KEY (movieId) REFERENCES movie(id),
    CONSTRAINT FK_showing_room FOREIGN KEY (roomId) REFERENCES room(id)
);

CREATE TABLE `order` (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    showingId VARCHAR(36) NULL,
    userId VARCHAR(36) NOT NULL,
    CONSTRAINT FK_order_showing FOREIGN KEY (showingId) REFERENCES showing(id) ON DELETE SET NULL,
    CONSTRAINT FK_order_user FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE seat (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    number INT NOT NULL,
    accessibleSeat BOOLEAN NOT NULL DEFAULT FALSE,
    reserved BOOLEAN NOT NULL DEFAULT FALSE,
    showingId VARCHAR(36) NOT NULL,
    orderId VARCHAR(36) NULL,
    CONSTRAINT FK_seat_showing FOREIGN KEY (showingId) REFERENCES showing(id) ON DELETE CASCADE,
    CONSTRAINT FK_seat_order FOREIGN KEY (orderId) REFERENCES `order`(id)
);

CREATE TABLE review (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    grade INT NOT NULL,
    is_Validated BOOLEAN NOT NULL DEFAULT FALSE,
    movieId VARCHAR(36) NOT NULL,
    userId VARCHAR(36) NULL,
    CONSTRAINT FK_review_movie FOREIGN KEY (movieId) REFERENCES movie(id) ON DELETE CASCADE,
    CONSTRAINT FK_review_user FOREIGN KEY (userId) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE incident (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    roomId VARCHAR(36) NOT NULL,
    CONSTRAINT FK_incident_room FOREIGN KEY (roomId) REFERENCES room(id)
);
