#!/bin/bash
 
###################################################
# Bash script to create database and seed 
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="reservations"
# USER="superuser"

# Output Filename for Faker File
OUTPUT="posts.csv"
FILEPATH="$DIR/$OUTPUT"
# if parameter 1 is not passed as argument default records to be generated to 1000000
LINES=${1:-1000000}

### Import Our Database ###
# Dont specify a database since CREATE DATABASE is in schema.sql
SCHEMA="$DIR/schema.sql"
psql -U $USER -d reservations < $SCHEMA

### Run Our Generator Script ###
node generators/generator.js --output=$FILEPATH --lines=$LINES

### Import Our posts.csv file to seed Database ###
psql -U $USER -d $DATABASE -c "COPY listings (name, maxGuests, minDays, rate, cleaningFee, serviceFee) FROM '$FILEPATH' CSV HEADER";