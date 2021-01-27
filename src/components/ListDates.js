// importamos react para poder usarlo, useState para cambiar los estados
// de nuestras variables, y useEffect para que cada vez que una variable se actualize se ejecute
import React, { useState, useEffect } from "react";
//importamos la dependencia moment que nos sirve para manipular las fechas
//y darles el formato que queremos
import moment from "moment";
//con este import la fecha que nos muestra moment tendra un formato en el idioma español
import "moment/locale/es";
moment.locale("es");


//creamos una constante ListDates en la cual se van  a guardar los datos de
// todas las citas que hemos guardado
const ListDates = ({ list }) => {
    
    //creamos una constante uniqueDates que nos va permitir guardar las fechas
    //en formatos unicos, esta variable la inicializamos en un array vacio
  const [uniqueDates, setUniqueDates] = useState([]);

  //creamos una funcion getUniqueDate que lo primero que va a realizar es obtener
  //el tiempo de cada cita que vamos a guardar para despues comparar ese 
  //ese tiempo con la posicion que ocupa cada fecha para por ultimo retornar
  //la fecha de cada tiempo , todo esto con el fin de comparar las fechas 
  //ára ordenarlas posteriormente
  const getUniqueDate = () => {
    let filterDates = list
      .map(function ({ date }) {
        return date.getTime();
      })
      .filter(function (date, i, array) {
        return array.indexOf(date) === i;
      })
      .map(function (time) {
        return new Date(time);
      });
    setUniqueDates(filterDates);
  };


  //creamos una funcion extractDate que nos va a permitir mostrar las citas
  //que coinciden en el mismo dia 
  const extractDates = (date) => {
    const listDates = list.filter((dateObj) => {
      return moment(dateObj.date).isSame(date);
    });

    //aqui se esta ordenando las citas de  menor a mayor de acuerdo a la 
    //hora de inicio de la cita, primero se crea una variable today 
    //que va ser igual a la fecha, despues de crea la variable dateObj
    //que solo va a guardar la fecha en sí sin la hora local, despues
    // se crea la variable dateA que va a concatenar el valor de dateObj 
    //mas el valor de la hora de inicio de cada cita que se guardo 
    //en el formulario , luego se crea dateB que cumple el mismo papel 
    //que dateA solo que guarda un siguiente valor de nuestro array dateObj
    // y por ultimo comparamos y ordenamos de menor a mayor las citas por medio 
    //de una resta
    listDates.sort(function compare(a, b) {
      let today = new Date();
      let dateObj = today.toISOString().split("T").shift(); 
      let dateA = moment(dateObj + " " + a.startTime); 
      let dateB = moment(dateObj + " " + b.startTime);
      return dateA - dateB; 

    });

    //por ultimo ya se muestran todas las citas ordenadas de acuerdo 
    //a la fecha y a la hora de inicio
    return listDates;
  };

  //usamos el useEffect porque nuestro componente se va a renderizar cada 
  //vez que se guarde una cita 
  useEffect(() => {
    getUniqueDate();
  }, [list]);

  //aqui el return nos va a renderizar los datos guardados de nuestra lista 
  //de citas segun como los estamos llamando, por cada cita guardada nos 
  //muestra mediante un h3 la fecha de la cita y como minimo un titulo 
  //y una fecha de inicio y una fecha de fin, en caso de que hayamos 
  //guardado mas de una cita en un mismo dia nos muestra las citas ordenadas


  return (
    <div className="container">
    <h2> Lista de Citas</h2>
    <hr/>
      {uniqueDates.map((date) => {
        return (
          <div>
            <h3>{moment(date).format("LL")}</h3>
            {extractDates(date).map((element, i) => {
              return (
                <div>
                  <h5> {i+1}. {element.title}</h5>
                  <p>
                    De  {element.startTime} a {element.endTime}
                  </p>
                </div>
              );
            })}
            <hr/>
          </div>
        );
      })}
    </div>
  );
};

export default ListDates;
