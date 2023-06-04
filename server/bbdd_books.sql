
DROP DATABASE IF EXISTS bbdd_libros;
CREATE DATABASE bbdd_libros;
USE bbdd_libros;

DROP TABLE IF EXISTS libros;

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    autor VARCHAR(255),
    editorial VARCHAR(255),
    precio FLOAT
);

INSERT INTO libros (titulo, autor, editorial, precio) VALUES
('titulo 1', ' autor 1','editorial 1', 9.90),
('titulo 2', ' autor 2','editorial 2', 7.90);