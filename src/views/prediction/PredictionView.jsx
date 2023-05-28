import './PredictionView.css'
import FormIndices from '../../components/formindices/FormIndices'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function PredictionView() {
    const navigate = useNavigate()
    const handleBack = () => {
      navigate('/')
    }

    return (

      <div className='prediction-view'>
        <div className='prediction-view__container'>
          <div className='prediction-view__container__background'>
            <img
              src='/img/logosimbolo-vertical.png'
              alt='background'
              className='img_backgroung unselectable'
            />
          </div>
          <div className='prediction-view__container__header'>
            <span
              className='prediction-view__container__header__icon_back'
              onClick={handleBack}
            >
              <FiArrowLeft />
            </span>
            <div className='prediction-view__container__title'>
              <h1>US Stock Performance Predictor</h1>
            </div>
            <span className='span_aux'>{':)'}</span>
          </div>
          <div className='prediction-view__container__content'>
            <FormIndices />
          </div>
        </div>
      </div>

    )
  }

