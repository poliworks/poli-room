CREATE TYPE RECURRENCE AS ENUM('daily', 'weekly', 'monthly', 'yearly', 'single');
CREATE TYPE USERTYPE AS ENUM('student', 'teacher');

CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
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
  room_id BIGINT REFERENCES rooms(id) ON DELETE CASCADE,
  features_id BIGINT REFERENCES features(id) ON DELETE CASCADE
);

CREATE TABLE problems (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  reported_by BIGINT REFERENCES users(id),
  reported_at TIMESTAMP,
  feature_id BIGINT REFERENCES features(id) ON DELETE CASCADE,
  room_id BIGINT REFERENCES rooms(id) ON DELETE CASCADE
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
  room_id BIGINT REFERENCES rooms(id) ON DELETE CASCADE
);
