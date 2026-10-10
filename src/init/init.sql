-- Données de démonstration pour le schéma TypeORM courant.
-- À exécuter après src/init/script.sql, sur une base vide.

USE cinephoria;

START TRANSACTION;

INSERT INTO role (id, name) VALUES
    (UUID(), 'admin'),
    (UUID(), 'employee'),
    (UUID(), 'user');

SET @france_id = UUID();
SET @belgique_id = UUID();
INSERT INTO country (id, name) VALUES
    (@france_id, 'France'),
    (@belgique_id, 'Belgique');

SET @standard_price_id = UUID();
SET @three_d_price_id = UUID();
SET @four_k_price_id = UUID();
SET @four_dx_price_id = UUID();
INSERT INTO price (id, price) VALUES
    (@standard_price_id, 9.90),
    (@three_d_price_id, 10.90),
    (@four_k_price_id, 12.90),
    (@four_dx_price_id, 15.90);

SET @standard_quality_id = UUID();
SET @three_d_quality_id = UUID();
SET @four_k_quality_id = UUID();
SET @four_dx_quality_id = UUID();
INSERT INTO projection_quality (id, quality, priceId) VALUES
    (@standard_quality_id, 'Standard', @standard_price_id),
    (@three_d_quality_id, '3D', @three_d_price_id),
    (@four_k_quality_id, '4K', @four_k_price_id),
    (@four_dx_quality_id, '4DX', @four_dx_price_id);

SET @toulouse_id = UUID();
SET @nantes_id = UUID();
SET @bruxelles_id = UUID();
INSERT INTO cinema (id, city, countryId) VALUES
    (@toulouse_id, 'Toulouse', @france_id),
    (@nantes_id, 'Nantes', @france_id),
    (@bruxelles_id, 'Bruxelles', @belgique_id);

SET @room_toulouse_1_id = UUID();
SET @room_toulouse_2_id = UUID();
SET @room_nantes_1_id = UUID();
SET @room_bruxelles_1_id = UUID();
INSERT INTO room (id, number, numberOfSeats, cinemaId, projectionQualityId) VALUES
    (@room_toulouse_1_id, 1, 20, @toulouse_id, @three_d_quality_id),
    (@room_toulouse_2_id, 2, 15, @toulouse_id, @four_dx_quality_id),
    (@room_nantes_1_id, 1, 25, @nantes_id, @four_k_quality_id),
    (@room_bruxelles_1_id, 1, 10, @bruxelles_id, @standard_quality_id);

SET @drama_genre_id = UUID();
SET @horror_genre_id = UUID();
SET @adventure_genre_id = UUID();
INSERT INTO genre (id, title) VALUES
    (@drama_genre_id, 'Drame'),
    (@horror_genre_id, 'Horreur'),
    (@adventure_genre_id, 'Aventure');

SET @iloveperu_id = UUID();
SET @uglystepsister_id = UUID();
SET @jurassicworld_id = UUID();
INSERT INTO movie (id, title, description, image_Url, minimum_Age, is_Favorite, genreId) VALUES
    (@iloveperu_id, 'I Love Peru', 'Un comédien part au Pérou pour une aventure spirituelle.', 'iloveperu.jpg', 13, FALSE, @drama_genre_id),
    (@uglystepsister_id, 'The Ugly Stepsister', 'Dans un royaume où la beauté règne en maître, Elvira affronte une redoutable concurrence.', 'theuglystepsister.webp', 16, TRUE, @horror_genre_id),
    (@jurassicworld_id, 'Jurassic World : Renaissance', 'Une équipe recherche un remède au sein d''une zone équatoriale hostile.', 'jurassicworld.jpg', 13, FALSE, @adventure_genre_id);

SET @showing_id = UUID();
INSERT INTO showing (id, date, start_At, end_At, movieId, roomId) VALUES
    (@showing_id, '2026-10-15 00:00:00', '20:00:00', '22:05:00', @jurassicworld_id, @room_toulouse_1_id);

-- 20 places : les deux premières sont accessibles PMR.
INSERT INTO seat (id, number, accessibleSeat, reserved, showingId, orderId) VALUES
    (UUID(), 1, TRUE, FALSE, @showing_id, NULL),
    (UUID(), 2, TRUE, FALSE, @showing_id, NULL),
    (UUID(), 3, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 4, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 5, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 6, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 7, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 8, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 9, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 10, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 11, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 12, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 13, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 14, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 15, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 16, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 17, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 18, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 19, FALSE, FALSE, @showing_id, NULL),
    (UUID(), 20, FALSE, FALSE, @showing_id, NULL);

COMMIT;
