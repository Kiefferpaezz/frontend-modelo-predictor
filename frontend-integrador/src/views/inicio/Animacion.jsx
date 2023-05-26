import React, { useState } from 'react';
import Informacion from './Informacion';
import './Animacion.css';

const Animacion = () => {
  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  const handleClick = () => {
    setMostrarInformacion(!mostrarInformacion);
  };

  return (
    <div>
      <button className='botonInfo'onClick={handleClick}>Acerca de</button>
      {mostrarInformacion && (
        <div className="informacion-animada">
          <Informacion />
        </div>
        
      )}
    </div>
  );
};

export default Animacion;
