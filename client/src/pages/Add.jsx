//axios y react-router-dom
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    editorial: "",
    precio: 0.00,
  });

  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (event) => {
    //const { name, value } = event.target;
    const name = event.target.name;
    const value = event.target.value;
    //almacena el estado (los valores de los inputs)
    setBook(values => ({...values, [name]: value}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        await axios.post("http://localhost:8800/libros", book);
        navigate("/");
      } catch (error) {
        console.log(error);
        setError(true)
      }
      
    } 
  

  return (
    <div className="card m-3 p-3" style={{width: "20rem"}}>
      <h1>Agregar libro</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="form-group my-3">
            <label className="form-label" for="titulo">Título </label>
            <input
                  className="form-control"
                  type="text"
                  placeholder="Titulo"
                  name="titulo"
                  value={book.titulo || ""}
                  onChange={handleChange}
              />
          </div>

          <div className="form-group mb-3">
            <label className="form-label" for="autor">Autor </label>
            <input
                  className="form-control"
                  type="text"
                  placeholder="Autor"
                  name="autor"
                  value={book.autor || ""}
                  onChange={handleChange}
              />
          </div>

          <div className="form-group mb-3">
            <label className="form-label" for="editorial">Editorial </label>
            <input
                  className="form-control"
                  type="text"
                  placeholder="Editorial"
                  name="editorial"
                  value={book.editorial|| ""}
                  onChange={handleChange}
              />
          </div>

          <div className="form-group mb-3">
            <label className="form-label" for="precio">Precio </label>
            <input
                  className="form-control"
                  type="number"
                  placeholder="Precio"
                  name="precio"
                  value={book.precio || ""}
                  onChange={handleChange}
              />
          </div>
            
          <button className="btn btn-primary mb-3" type="submit">Añadir</button>
      </form>
      
      {error && "Ha ocurrido un error inesperado"}
      <Link to="/">Ver todos los libros</Link>
    </div>
  );
};

export default Add;
