DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

\c blog;

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    maxGuests INT,
    minDays INT,
    rate INT,
    cleaningFee INT,
    serviceFee INT,
)

CREATE TABLE IF NOT EXISTS dates (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES listings(id),
    firstDate  DATE,
    lastDate DATE,
)