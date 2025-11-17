-- transaction création des sièges lors de la création d'une séance en fonction du nombre de place de la salle sélectionnée 
-- et avec 10% de siège réservés à mobilité réduite

DELIMITER $$

CREATE PROCEDURE CreateShowing(
    IN p_showing_id CHAR(36),
    IN p_date DATETIME,
    IN p_startAt TIME,
    IN p_endAt TIME,
    IN p_movieId CHAR(36),
    IN p_roomId CHAR(36),
    IN p_numberOfSeats INT
)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE accessibleSeats INT DEFAULT CEIL(p_numberOfSeats * 0.1);
    DECLARE seat_id CHAR(36);

    START TRANSACTION;

    INSERT INTO showing (id, date, startAt, endAt, movieId, roomId)
    VALUES (p_showing_id, p_date, p_startAt, p_endAt, p_movieId, p_roomId);

    WHILE i <= p_numberOfSeats DO
        SET seat_id = UUID();
        INSERT INTO seat (id, number, accessibleSeat, reserved, showingId)
        VALUES (
            seat_id,
            i,
            IF(i <= accessibleSeats, TRUE, FALSE),
            FALSE,
            p_showing_id
        );
        SET i = i + 1;
    END WHILE;

    COMMIT;
END$$

DELIMITER ;

-- end Transaction


-- Insertion de données

INSERT INTO Movie(title, description, image_Url, minimum_Age, genreId ) VALUES
("I Love Peru","Lancé dans une course effrénée vers le succès, un comédien biscornu abandonne ses plus fidèles alliés. Seul face à lui-même, une vision troublante le percute. Direction le Pérou pour une aventure spirituelle.","iloveperu.jpg", 13, 'e3d87fe4-94de-4f1a-b1c7-57e4230d2858'),
(),
()


INSERT INTO price VALUES(uuid(), 9.90),(uuid(), 10.90),(uuid(), 12.90),(uuid(), 15.90);

INSERT INTO projection_quality VALUES 
(uuid(),'4DX',(SELECT id FROM price WHERE price = 15.90)),
(uuid(),'3D',(SELECT id FROM price WHERE price = 10.90)),
(uuid(),'4K',(SELECT id FROM price WHERE price = 12.90)),
(uuid(),'standard', (SELECT id FROM price WHERE price = 9.90));

INSERT INTO country VALUES (uuid(),'france'),(uuid(),'belgique');

INSERT INTO cinema VALUES 
(uuid(), 'toulouse', (SELECT id FROM country WHERE name = 'france')),
(uuid(), 'nantes', (SELECT id FROM country WHERE name = 'france')),
(uuid(), 'lille', (SELECT id FROM country WHERE name = 'france')),
(uuid(), 'bordeaux', (SELECT id FROM country WHERE name = 'france')),
(uuid(), 'paris', (SELECT id FROM country WHERE name = 'france')),
(uuid(), 'charleroi', (SELECT id FROM country WHERE name = 'belgique')),
(uuid(), 'liège', (SELECT id FROM country WHERE name = 'belgique'));



INSERT INTO room VALUES
(uuid(), 1, 20, (SELECT id FROM cinema WHERE city='toulouse'), (SELECT id FROM projection_quality WHERE quality='3D')),
(uuid(), 2, 15, (SELECT id FROM cinema WHERE city='toulouse'), (SELECT id FROM projection_quality WHERE quality='4DX')),
(uuid(), 3, 25, (SELECT id FROM cinema WHERE city='toulouse'), (SELECT id FROM projection_quality WHERE quality='4K')),
(uuid(), 4, 10, (SELECT id FROM cinema WHERE city='toulouse'), (SELECT id FROM projection_quality WHERE quality='standard')),
(uuid(), 1, 20, (SELECT id FROM cinema WHERE city='nantes'), (SELECT id FROM projection_quality WHERE quality='3D')),
(uuid(), 2, 15, (SELECT id FROM cinema WHERE city='nantes'), (SELECT id FROM projection_quality WHERE quality='4DX')),
(uuid(), 1, 25, (SELECT id FROM cinema WHERE city='bordeaux'), (SELECT id FROM projection_quality WHERE quality='4K')),
(uuid(), 2, 10, (SELECT id FROM cinema WHERE city='bordeaux'), (SELECT id FROM projection_quality WHERE quality='standard')),
(uuid(), 1, 15, (SELECT id FROM cinema WHERE city='paris'), (SELECT id FROM projection_quality WHERE quality='3D')),
(uuid(), 2, 20, (SELECT id FROM cinema WHERE city='paris'), (SELECT id FROM projection_quality WHERE quality='standard')),
(uuid(), 1, 10, (SELECT id FROM cinema WHERE city='lille'), (SELECT id FROM projection_quality WHERE quality='4DX')),
(uuid(), 2, 20, (SELECT id FROM cinema WHERE city='lille'), (SELECT id FROM projection_quality WHERE quality='4K')),
(uuid(), 1, 15, (SELECT id FROM cinema WHERE city='charleroi'), (SELECT id FROM projection_quality WHERE quality='standard')),
(uuid(), 2, 25, (SELECT id FROM cinema WHERE city='charleroi'), (SELECT id FROM projection_quality WHERE quality='3D')),
(uuid(), 1, 10, (SELECT id FROM cinema WHERE city='liège'), (SELECT id FROM projection_quality WHERE quality='4DX')),
(uuid(), 2, 25, (SELECT id FROM cinema WHERE city='liège'), (SELECT id FROM projection_quality WHERE quality='4K'));

-- end insertion de données

-- Procedure create

        --for numberOfSeats = 10

DELIMITER //

CREATE PROCEDURE insert_ten_seat_loop()

BEGIN
DECLARE i INT DEFAULT 1;

WHILE i<=10 DO
-- insert into seat values (uuid(), i, false, false, iddelaseance)
INSERT INTO seat VALUES (uuid(), i, false, false, '53905558-7212-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab244dfb-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab245753-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab246145-7211-11f0-9e9c-36b09edbb3e4');


SET i = i + 1;
END WHILE;
END // 

DELIMITER ;

-- CALL insert_ten_seat_loop()

        -- for numberOfSeats = 15

DELIMITER //

CREATE PROCEDURE insert_fifteen_seat_loop()

BEGIN
DECLARE i INT DEFAULT 1;

WHILE i<=15 DO
-- insert into seat values (uuid(), i, false, false, iddelaseance)
INSERT INTO seat VALUES (uuid(), i, false, false, '53904b02-7212-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab244423-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab2451a5-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab245cc7-7211-11f0-9e9c-36b09edbb3e4');

SET i = i + 1;

END WHILE;

END // 

DELIMITER ;

        -- for numberOfSeats = 18

DELIMITER //

CREATE PROCEDURE insert_eighteen_seat_loop()

BEGIN
DECLARE i INT DEFAULT 1;

WHILE i<=18 DO
-- insert into seat values (uuid(), i, false, false, iddelaseance)
INSERT INTO seat VALUES (uuid(), i, false, false, '53905187-7212-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab244aaa-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab245edb-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab246409-7211-11f0-9e9c-36b09edbb3e4');

SET i = i + 1;

END WHILE;

END // 

DELIMITER ;

        -- for numberOfSeats = 20

DELIMITER //

CREATE PROCEDURE insert_twenty_seat_loop()

BEGIN
DECLARE i INT DEFAULT 1;

WHILE i<=20 DO
-- insert into seat values (uuid(), i, false, false, iddelaseance)
INSERT INTO seat VALUES (uuid(), i, false, false, '53903d25-7212-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab2416f0-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab245466-7211-11f0-9e9c-36b09edbb3e4');
INSERT INTO seat VALUES (uuid(), i, false, false, 'ab245a30-7211-11f0-9e9c-36b09edbb3e4');


SET i = i + 1;

END WHILE;

END // 

DELIMITER ;



-- [
--   {
--     "id": "1edabd3f-16e4-4c25-9ef5-84802212612d",
--     "title": "I Love Peru",
--     "description": "Lancé dans une course effrénée vers le succès, un comédien biscornu abandonne ses plus fidèles alliés. Seul face à lui-même, une vision troublante le percute. Direction le Pérou pour une aventure spirituelle.",
--     "image_Url": "iloveperu.jpg",
--     "minimum_Age": 13,
--     "is_Favorite": false,
--     "create_At": "2025-07-08T15:14:09.924Z"
--   },
--   {
--     "id": "3171c515-f757-412b-9c52-63e18b2bc23f",
--     "title": "The Ugly Stepsister",
--     "description": "Dans un royaume où la beauté règne en maître, la jeune Elvira doit faire face à une redoutable concurrence pour espérer conquérir le cœur du prince. Parmi les nombreuses prétendantes, se trouve notamment sa demi-sœur, à l'insolente beauté. Pour parvenir à ses fins dans cette impitoyable course au physique parfait, Elvira devra recourir aux méthodes les plus extrêmes...",
--     "image_Url": "theuglystepsister.webp",
--     "minimum_Age": 16,
--     "is_Favorite": true,
--     "create_At": "2025-07-08T15:01:40.880Z"
--   },
--   {
--     "id": "39970368-8007-45eb-9c6f-878137a03ed0",
--     "title": "L'accident de piano",
--     "description": "Magalie est une star du web hors sol et sans morale qui gagne des fortunes en postant des contenus choc sur les réseaux. Après un accident grave survenu sur le tournage d'une de ses vidéos, Magalie s'isole à la montagne avec Patrick, son assistant personnel, pour faire un break. Une journaliste détenant une information sensible commence à lui faire du chantage… La vie de Magalie bascule.",
--     "image_Url": "l'accidentdepiano.webp",
--     "minimum_Age": 13,
--     "is_Favorite": false,
--     "create_At": "2025-07-08T14:56:29.972Z"
--   },
--   {
--     "id": "e3e4127d-6544-46e3-b6c1-a71f941a882d",
--     "title": "Jurassic World : Renaissance",
--     "description": "Cinq ans après JURASSIC WORLD : LE MONDE D’APRÈS, l’environnement de la planète s’est révélé hostile pour la plupart des dinosaures. Ceux qui subsistent vivent dans des zones équatoriales isolées, aux conditions proches de celles de leur ère d’origine. Parmi ces créatures terrifiantes, trois spécimens renferment peut-être la clé d’un remède capable de changer le destin de l’humanité.",
--     "image_Url": "jurassicworld.jpg",
--     "minimum_Age": 13,
--     "is_Favorite": false,
--     "create_At": "2025-07-10T08:58:53.731Z"
--   }
-- ]