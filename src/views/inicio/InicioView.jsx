import './InicioView.css'
import { useState } from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import Animacion from './Animacion'
import mydata from '../../assets/data/data.json'
import { MyResponsiveLine } from '../../components/grafica/MyResponsiveLine'

export default function InicioView() {
  const navigate = useNavigate()
  const showAlert = () => {
    swal({
      icon: 'info',
      title: 'Desea ingresar los datos desde un archivo excel?',
      buttons: {
        si: {
          text: 'Si',
          value: 'Si'
        },
        no: {
          text: 'No',
          value: 'No'
        },
        cancel: 'Cancelar'
      }
    }).then((value) => {
      switch (value) {
        case 'Si':
          navigate('/grafico')
          break
        case 'No':
          navigate('/main')
          break
        default:
          return
      }
    })
  }

  return (
    <div>
      <img className='imagenIzquierda' src='/img/bandera.png/' alt='imagenIz' />
      <h1 className='titulo'>US Stock Performance Predictor</h1>

      <p className='parrafo'>
        {' '}
        Bienvenido a US Stock Performance Predictor, aquí encontrarás una
        herramienta revolucionaria que te brinda la oportunidad de adentrarte en
        el emocionante mundo de las inversiones en acciones.{' '}
      </p>
      <p className='parrafo2'>
        ¿Te has sentido intimidado por la falta de conocimientos financieros o
        por la posibilidad de sufrir pérdidas económicas? ¡No te preocupes más!
        Hemos desarrollado una aplicación basada en inteligencia artificial y
        aprendizaje automático que te ayudará a tomar decisiones informadas y
        maximizar tus ganancias. Descubre cómo pronosticamos el rendimiento de
        empresas estadounidenses utilizando variables económicas clave y cómo
        implementamos este conocimiento en una aplicación web fácil de usar.
        ¡Prepárate para invertir con confianza y alcanzar tus metas financieras
        a largo plazo!
      </p>
      <div
        style={{
          width: '100%',
          height: '500px'
        }}
      >
        <MyResponsiveLine data={mydata} />
      </div>
      <button className='botonInicio' onClick={showAlert}>
        Continuar
      </button>
      <Animacion />
    </div>
  )
}
