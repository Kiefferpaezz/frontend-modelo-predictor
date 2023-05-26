import './InicioView.css'
import { useState } from 'react'
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom"
import Animacion from './Animacion'

export default function InicioView() {
    const navigate = useNavigate()
    const showAlert = () => {
        swal({
            icon: "info",
            title: "Desea ingresar los datos desde un archivo excel?",
            buttons: {
                si: {
                    text: "Si",
                    value: "Si",
                },
                no: {
                    text: "No",
                    value: "No",
                },
                cancel: "Cancelar"
            },

        }).then((value) => {
            switch (value) {
                case "Si":
                    navigate('/grafico')
                    break;
                case "No":
                    navigate('/main')
                    break;
                default:
                    return;
            }
        }
        );
    }

    return (
        <div>
            <h1 className='titulo'>Aplicacion de Machine Learning que predice el rendimiento de empresas estadounidenses </h1>
            <button className='botonInicio' onClick={showAlert}>Continuar</button>
            <Animacion />
        </div>
    )
}

