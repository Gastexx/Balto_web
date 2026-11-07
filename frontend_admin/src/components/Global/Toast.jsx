import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Loader2, Info } from 'lucide-react';
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
    exito: CheckCircle2,
    error: XCircle,
    advertencia: AlertTriangle,
    cargando: Loader2,
    info: Info
  };

  const clasesTipo = {
    exito: 'toast-exito',
    error: 'toast-error',
    advertencia: 'toast-advertencia',
    cargando: 'toast-cargando',
    info: 'toast-info'
  };

  const IconoSeleccionado = iconos[tipo] || Info;
  const claseSeleccionada = clasesTipo[tipo] || 'toast-info';

  return (
<div className={`toast-container ${claseSeleccionada} ${desapareciendo ? 'desaparecer' : ''}`}>
  <IconoSeleccionado
    size={22}
    aria-hidden="true"
    className={`toast-icon ${tipo === 'cargando' ? 'spin' : ''}`}
  />
  <span className="toast-message">{mensaje}</span>
</div>

  );
};

export default Toast;