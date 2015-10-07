CREATE DATABASE IF NOT EXISTS interdesigners;

use interdesigners;

CREATE TABLE IF NOT EXISTS Dias(
	id INTEGER primary key auto_increment,
	val VARCHAR(8) not null
);

CREATE TABLE IF NOT EXISTS Horarios(
	id INTEGER primary key auto_increment,
	val int not null
);

CREATE TABLE IF NOT EXISTS Locais(
	id INTEGER primary key auto_increment,
	local VARCHAR(30) not null
);

CREATE TABLE IF NOT EXISTS Eventos(
	id INTEGER primary key auto_increment,
	titulo VARCHAR(100) not null,
	descricao TEXT not null,
	responsavel VARCHAR(100) not null,
	categoria VARCHAR(15) not null,
	duracao INTEGER not null,
	data INTEGER not null,
	horario INTEGER not null,
	local INTEGER not null
);