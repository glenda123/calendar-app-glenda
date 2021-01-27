// importamos react para poder usarlo, useState para cambiar los estados
// de nuestras variables, y useEffect para que cada vez que una variable se actualize se ejecute
import React, { useState, useEffect } from "react";
//importamos una dependencia que hemos instalado para mostrar un calendario
import Calendar from "react-calendar";
//importamos una dependencia que nos permite abrir un modal cada vez que seleccionemos un dia del calendario
import Modal from "react-modal";
//importamos el componente ListDates que va permitir mostrar las citas 
//guardadas para poder renderizarlo en el componente App
import ListDates from "./components/ListDates";
//importamos los estilos de nuestro calendario
import "react-calendar/dist/Calendar.css";

//importamos el archivo styles.css
import './styles.css'

export default function App() {

  //creamos una variable day que nos permitira guardar el dia que hemos 
  //seleccionado del calendario
  const [day, setDay] = useState();

  //creamos una variable modalIsOpen que mediante el uso de useState esta
  //inicializada en falso porque al principio no se muestra el modal solo 
  //si el estado cambia a true se mostrara el modal
  const [modalIsOpen, setIsOpen] = useState(false);

//creamos una variable listDate que nos guarde los datos de 
//nuestro formulario
  const [listDate, setListDate] = useState([]);
  const [date, setDate] = useState({});

  //usamos el useEffect porque se va aplicar la funcion openModal cada vez 
  //que seleccionemos el dia en que queremos guardar una cita
  useEffect(() => {
    if (day) {
      openModal();
    }
  }, [day]);

  //creamos una funcion que nos permita cambiar el estado del modal a true 
  //significando que este se va a mostrar
  const openModal = () => {
    setIsOpen(true);
  };

  //creamos una funcion que cambie el estado a falso significando que
  //el modal no se va a mostrar
  const closeModal = () => {
    setIsOpen(false);
  };

  //esta funcion nos permite guardar cada cita en un array cuando completamos los datos del formulario 
  //y le damos a enviar
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setListDate([...listDate, date]);
  };

  

  //esta funcion permite pasar el valor que escribimos en cada 
  //componente de nuestro formulario para obtenerlo y de ahi guardarlo 
  //con la funcion onHandleSubmit
  const onHandleInput = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value, date: day });
  };

  //Dentro del return se muestra todo los componentes que se van a renderizar
  //en el componente principal como el calendario, el modal y la 
  //lista de citas que cada uno cuenta con sus props para poder 
  //utilizarlas desde cada componente.
  //Vemos por ejemplo que el componente Calendar recibe como 
  //valor el dia y recibe la funcion onChange cada vez que se seleccione
  //un dia, el componente modal recibe las propiedades isOpen que llama 
  //a la variable modalIsOpen y la propiedad onRequestClose que permite 
  //cerrar el modal
  return (
    <div >
      <h1>CalendarApp</h1>
      <hr/>
      <div className="row">
        <div className='col-lg-7 col-xs-12'>
          <Calendar value={day} onChange={(e) => setDay(e)} className="calendar" />
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        
          <h2>Añadir cita</h2>
          <hr/>
          <button onClick={closeModal} className="btn btn-outline-primary   mr-2 close">Cerrar</button>
          <form onInput={onHandleInput} onSubmit={onHandleSubmit} className="form-group">
            <label htmlFor="title">Título </label>
            <input type="text" id="title" name="title" placeholder= "Ingresa el título de la cita" className="form-control"/>

            <label htmlFor="startTime">Hora de Inicio</label>
            <input type="time" id="startTime" name="startTime"  className="form-control"/>
            <label htmlFor="endTime">Hora Final</label>
            <input type="time" id="endTime" name="endTime"  className="form-control"/>

            <button type="submit" className='btn btn-outline-primary mt-2 btn-block'>Guardar cita</button>
        </form>
        
      </Modal>
      <div className="col-lg-5 col-xs-12">
        <ListDates list={listDate} />
      </div>
      </div>
    </div>
  );
}

