CREATE SCHEMA ifood;

CREATE TABLE ifood.accounts (
	id varchar(255) PRIMARY KEY,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL
);

CREATE TABLE ifood.restaurants (
	id varchar(255) PRIMARY KEY,
	name NOT NULL varchar(255) UNIQUE,
	image varchar(255),
	address NOT NULL varchar(255),
	account_id varchar(255),
	FOREIGN KEY (account_id) REFERENCES ifood.accounts(id)
);