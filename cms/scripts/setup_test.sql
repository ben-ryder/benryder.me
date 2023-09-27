-- Cleaning up existing internal if present
DROP DATABASE IF EXISTS cms_benryder_me_test;

-- Cleaning up existing user if present
DROP USER IF EXISTS cms_benryder_me_test;

-- Create user and database
CREATE USER cms_benryder_me_test WITH PASSWORD 'password' LOGIN;
CREATE DATABASE cms_benryder_me_test;
GRANT CONNECT ON DATABASE cms_benryder_me_test TO cms_benryder_me_test;

-- Switch to new internal
\c cms_benryder_me_test

-- Create UUID extension for uuid_generate_v4 support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant privileges to lfb user after everything is created
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cms_benryder_me_test;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cms_benryder_me_test;
