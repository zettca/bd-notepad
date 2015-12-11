DROP TABLE IF EXISTS tentativas;
DROP TABLE IF EXISTS d_utilizador;
DROP TABLE IF EXISTS d_tempo;

CREATE TABLE IF NOT EXISTS d_utilizador (
    userid INT(11) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    pais VARCHAR(45) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
PRIMARY KEY (userid)
);

CREATE TABLE IF NOT EXISTS d_tempo (
    contador_login INT NOT NULL,
    dia INT NOT NULL,
    mes INT NOT NULL,
    ano INT NOT NULL,
PRIMARY KEY (contador_login)
);

CREATE TABLE IF NOT EXISTS tentativas (
    userid INT(11) NOT NULL,
    contador_login INT NOT NULL,
    sucesso TINYINT(1) NOT NULL,
PRIMARY KEY (userid, contador_login),
FOREIGN KEY (userid) REFERENCES d_utilizador (userid),
FOREIGN KEY (contador_login) REFERENCES d_tempo (contador_login)
);

INSERT INTO d_utilizador
SELECT utl.userid, utl.email, nome, utl.pais, utl.categoria
FROM utilizador AS utl;

INSERT INTO d_tempo
SELECT contador_login, EXTRACT(DAY FROM moment), EXTRACT(MONTH FROM moment), EXTRACT(YEAR FROM moment)
FROM login;

INSERT INTO tentativas
SELECT userid, contador_login, sucesso
FROM login;


/* Alinea b */
SELECT categoria, mes, ano, COUNT(sucesso) / COUNT(DISTINCT userid)
FROM tentativas NATURAL JOIN d_utilizador NATURAL JOIN d_tempo
WHERE pais = 'Portugal'
GROUP BY categoria, ano, mes WITH ROLLUP