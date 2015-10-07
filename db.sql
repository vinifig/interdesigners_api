CREATE DATABASE IF NOT EXISTS interdesigners_teste;

use interdesigners_teste;

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

INSERT INTO Dias values
	(null,'05/11'),
	(null,'06/11'),
	(null,'07/11');

INSERT INTO Horarios values
	(null,'8'),
	(null,'9'),
	(null,'10'),
	(null,'11'),
	(null,'12'),
	(null,'13'),
	(null,'14'),
	(null,'15'),
	(null,'16'),
	(null,'17'),
	(null,'18'),
	(null,'19'),
	(null,'20'),
	(null,'21');

INSERT INTO Locais values
	(null,'Guilhermao'),
	(null,'LTIA');

	