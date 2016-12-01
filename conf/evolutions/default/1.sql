# Setup DB

# --- !Ups

CREATE TYPE RECURRENCE AS ENUM('daily', 'weekly', 'monthly', 'yearly', 'single');
CREATE TYPE USERTYPE AS ENUM('student', 'teacher');

CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  encrypted_password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_type VARCHAR(255) NOT NULL
);

CREATE TABLE rooms (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  building VARCHAR(255),
  department VARCHAR(255),
  size INT,
  CHECK (size >= 0)
);

CREATE TABLE features (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  img VARCHAR(255) NULL
);

CREATE TABLE rooms_features (
  room_id BIGINT REFERENCES rooms(id),
  features_id BIGINT REFERENCES features(id)
);

CREATE TABLE problems (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  reported_by BIGINT REFERENCES users(id),
  reported_at TIMESTAMP,
  feature_id BIGINT REFERENCES features(id),
  room_id BIGINT REFERENCES rooms(id)
);

CREATE TABLE events(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  CHECK (end_time > events.start_time),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  scheduled_by BIGINT REFERENCES users(id),
  recurrence RECURRENCE,
  room_id BIGINT REFERENCES rooms(id)
);

INSERT INTO rooms (id, name, building, department, size) VALUES (1, 'teste', 'fedido', 'coco', 10);
INSERT INTO rooms (id, name, building, department, size) VALUES (2, 'outra', 'fedido', 'nanan', 20);
INSERT INTO rooms (id, name, building, department, size) VALUES (3, 'sala2', 'lele', 'baba', 20);
INSERT INTO rooms (id, name, building, department, size) VALUES (4, 'sala3', 'lele', 'bubu', 30);
INSERT INTO rooms (id, name, building, department, size) VALUES (5, 'Inserido', 'Nova Sala', 'PCS', 30);
INSERT INTO users (id, email, encrypted_password, name, user_type) VALUES (1, 'teste@mail.com', '1234', 'teste', 'aluno');
INSERT INTO events (id, start_time, end_time, name, description, scheduled_by, recurrence, room_id) VALUES (1, '2016-11-30 13:36:12.000000', '2016-11-30 14:36:15.721000', 'Evento 1', 'Um evento qualquer', 1, 'weekly', 1);
INSERT INTO features (id, name, description, quantity, img) VALUES (1, 'quadro branco', 'desc', 1, 'whiteboard.png');
INSERT INTO features (id, name, description, quantity, img) VALUES (2, 'quadro negro', 'desc', 1, 'whiteboard.png');
INSERT INTO features (id, name, description, quantity, img) VALUES (3, 'ar condicionado', 'desc', 1, 'whiteboard.png');
INSERT INTO features (id, name, description, quantity, img) VALUES (4, 'ventilador', 'desc', 1, 'whiteboard.png');
INSERT INTO features (id, name, description, quantity, img) VALUES (5, 'projetor', 'desc', 1, 'whiteboard.png');
INSERT INTO features (id, name, description, quantity, img) VALUES (6, 'caixa de som', 'desc', 1, 'whiteboard.png');
INSERT INTO features (id, name, description, quantity, img) VALUES (7, 'luz', 'desc', 1, 'whiteboard.png');
INSERT INTO rooms_features (room_id, features_id) VALUES (1, 1);
INSERT INTO rooms_features (room_id, features_id) VALUES (1, 2);
INSERT INTO rooms_features (room_id, features_id) VALUES (1, 3);
INSERT INTO rooms_features (room_id, features_id) VALUES (2, 1);
INSERT INTO rooms_features (room_id, features_id) VALUES (2, 4);
INSERT INTO rooms_features (room_id, features_id) VALUES (2, 5);
INSERT INTO rooms_features (room_id, features_id) VALUES (3, 6);
INSERT INTO rooms_features (room_id, features_id) VALUES (3, 7);
INSERT INTO rooms_features (room_id, features_id) VALUES (1, 6);

# --- !Downs

DROP TABLE users;
DROP TABLE rooms;
DROP TABLE features;
DROP TABLE problems;
DROP TABLE rooms_features;
DROP TABLE events;
