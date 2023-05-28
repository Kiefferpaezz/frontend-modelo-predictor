import './HomeView.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

export default function HomeView() {
  const [showInfo, setShowInfo] = useState(false)
  const navigate = useNavigate()
  const handleClickContinue = () => {
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
          navigate('/prediction/excel')
          break
        case 'No':
          navigate('/prediction')
          break
        default:
          return
      }
    })
  }
  return (
    <div className='home-view'>
      <div className='home-view__container'>
        <div className='home-view__container__background'>
          <img
            src='/img/logosimbolo-vertical.png'
            alt='background'
            className='img_backgroung unselectable'
          />
        </div>
        <div className='home-view__container__title'>
          <h1>US Stock Performance Predictor</h1>
        </div>
        <div className='home-view__container__content'>
          <p>
            Bienvenido a US Stock Performance Predictor, aquí encontrarás una
            herramienta revolucionaria que te brinda la oportunidad de
            adentrarte en el emocionante mundo de las inversiones en acciones.
          </p>
          <p>
            ¿Te has sentido intimidado por la falta de conocimientos financieros
            o por la posibilidad de sufrir pérdidas económicas? ¡No te preocupes
            más! Hemos desarrollado una aplicación basada en inteligencia
            artificial y aprendizaje automático que te ayudará a tomar
            decisiones informadas y maximizar tus ganancias. Descubre cómo
            pronosticamos el rendimiento de empresas estadounidenses utilizando
            variables económicas clave y cómo implementamos este conocimiento en
            una aplicación web fácil de usar. ¡Prepárate para invertir con
            confianza y alcanzar tus metas financieras a largo plazo!
          </p>
        </div>
        <div className='home-view__container__buttons'>
          <div className='home-view__container__buttons__info'>
            <div
              className={`home-view__info__card_continer ${
                showInfo ? 'open_card_continer_info' : ''
              }`}
            >
              <div
                className='home-view__container__buttons__info__card'
                onClick={() => setShowInfo(false)}
              >
                <h2>Creadores</h2>
                <p>Jhonatan Tamayo Morales</p>
                <p>Kieffer Alexander Paez Rozo</p>
                <p>Proyecto Integrador 2</p>
                <p>Ingenieria de Sistemas</p>
                <p>Universidad de Antioquia</p>
                <p>2023</p>
              </div>
            </div>
            <button
              className='home-view__btn'
              onClick={() => {
                setShowInfo(!showInfo)
              }}
            >
              Acerca de
            </button>
          </div>
          <div className='home-view__container__buttons__continue'>
            <button className='home-view__btn' onClick={handleClickContinue}>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
