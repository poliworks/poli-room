# Setup DB

# --- !Ups

CREATE TYPE RECURRENCE AS ENUM('daily', 'weekly', 'monthly', 'yearly');
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
  name VARCHAR(255) NOT NULL
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

# --- !Downs

DROP TABLE users;
DROP TABLE rooms;
DROP TABLE features;
DROP TABLE problems;
DROP TABLE rooms_features;
DROP TABLE events;
