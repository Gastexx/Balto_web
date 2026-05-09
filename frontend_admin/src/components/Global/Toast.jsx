import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faSpinner,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import './Toast.css';

const Toast = ({ tipo, mensaje, onClose, duracion }) => {
  const [desapareciendo, setDesapareciendo] = useState(false);

  useEffect(() => {
    const tiempoVisible = Number(duracion) > 500 ? Number(duracion) : 3000;

    const mostrarTimer = setTimeout(() => {
      setDesapareciendo(true);
    }, tiempoVisible - 500);

    const ocultarTimer = setTimeout(() => {
      onClose();
    }, tiempoVisible);

    return () => {
      clearTimeout(mostrarTimer);
      clearTimeout(ocultarTimer);
    };
  }, [onClose, duracion]);

  const iconos = {
    exito: faCheckCircle,
    error: faTimesCircle,
    advertencia: faExclamationTriangle,
    cargando: faSpinner,
    info: faInfoCircle
  };

  const clasesTipo = {
    exito: 'toast-exito',
    error: 'toast-error',
    advertencia: 'toast-advertencia',
    cargando: 'toast-cargando',
    info: 'toast-info'
  };

  const iconoSeleccionado = iconos[tipo] || faInfoCircle;
  const claseSeleccionada = clasesTipo[tipo] || 'toast-info';

  return (
<div className={`toast-container ${claseSeleccionada} ${desapareciendo ? 'desaparecer' : ''}`}>
  <FontAwesomeIcon
    icon={iconoSeleccionado}
    className={`toast-icon ${tipo === 'cargando' ? 'spin' : ''}`}
  />
  <span className="toast-message">{mensaje}</span>
</div>

  );
};

export default Toast;