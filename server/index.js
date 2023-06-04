import express from "express";
import mysql from "mysql";
import cors from "cors";

//Express permite configurar y administrar un servidor HTTP para acceder a los recursos del mismo dominio. 
const app = express();

//Maneja recursos de un origen cruzado o dominio diferente
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bbdd_libros",
});

app.get("/", (req, res) => {
  res.json("Bienvenido a Nodejs");
});

app.get("/libros", (req, res) => {
  const q = "SELECT * FROM libros";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/libros", (req, res) => {

  const q = "INSERT INTO libros (`titulo`, `autor`, `editorial`, `precio`) VALUES (?)";

  const values = [
    req.body.titulo,
    req.body.autor,
    req.body.editorial,
    req.body.precio,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/libros/:id", (req, res) => {
    
  const bookId = req.params.id;
  const q = " DELETE FROM libros WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/libros/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE libros SET `titulo`= ?, `autor`= ?, `editorial`= ?, `precio`= ? WHERE id = ?";

  const values = [
    req.body.titulo,
    req.body.autor,
    req.body.editorial,
    req.body.precio,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Conectado al Servidor");
});