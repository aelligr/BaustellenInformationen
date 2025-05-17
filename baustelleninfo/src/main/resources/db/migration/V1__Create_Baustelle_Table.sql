CREATE TABLE baustelle (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           projekt_nummer VARCHAR(255),
                           dauer_von TIMESTAMP,
                           dauer_bis TIMESTAMP,
                           objekt_angaben VARCHAR(255),
                           achs_bezeichnung VARCHAR(255),
                           status VARCHAR(255),
                           projektbezeichnung VARCHAR(255),
                           geo_json_data TEXT
);