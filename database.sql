CREATE SCHEMA ifood;

CREATE TABLE ifood.accounts (
	id varchar(255) PRIMARY KEY,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL
);