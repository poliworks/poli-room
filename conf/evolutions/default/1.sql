# Setup DB

# --- !Ups

CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_type VARCHAR(255) NOT NULL
);

# --- !Downs

DROP TABLE users;
