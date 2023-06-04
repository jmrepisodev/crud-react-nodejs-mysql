import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  {/*useEffect define secciones de código a ejecutar justo después del primer renderizado.*/}
  useEffect(() => {
    const fetchAllBooks = async () => {
        try{
          const response = await axios.get("http://localhost:8800/libros");
          console.log(response);
          setBooks(response.data);
        }catch (error) {
          console.error(error);
        }
        
    };

    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/libros/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <div>
      <h1 className="text-center">Lista de libros</h1>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <div key={book.id} className="card m-3 p-3" style={{width: "18rem"}}>
            <div className="card-header">
              <h2>{book.titulo}</h2>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{book.autor}</li>
                <li className="list-group-item">{book.editorial}</li>
                <li className="list-group-item">{book.precio}€</li>
              </ul>
            </div>
            <div className="card-footer">
                <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Eliminar</button>
                <button className="btn btn-primary m-3">
                  <Link
                    to={`/update/${book.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Actualizar
                  </Link>
                </button>
            </div> 
           
          </div>
        ))}
      </div>
      <br />
      <button className="btn btn-success m-3">
        <Link 
          to="/add" 
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Agregar libro
        </Link>
      </button>
    </div>
  );
};

export default Books;