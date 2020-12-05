DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

\c reservations;

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    maxGuests INT,
    minDays INT,
    rate INT,
    cleaningFee INT,
    serviceFee INT
);

CREATE TABLE IF NOT EXISTS dates (
    id SERIAL PRIMARY KEY,
    listing_id INT,
    firstDate  VARCHAR,
    lastDate VARCHAR,
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    check_in VARCHAR,
    check_out VARCHAR,
    adults INT,
    children INT,
    infants INT
);