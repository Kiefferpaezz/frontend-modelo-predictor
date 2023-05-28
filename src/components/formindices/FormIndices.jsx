import { useState } from 'react'
import './FormIndices.css'
import { initialIndices, fetchData } from '../../assets/utils/utils'
import swal from 'sweetalert'

export default function FormIndices() {
  const [indices, setIndices] = useState(
    JSON.parse(JSON.stringify(initialIndices))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const handleSetIndices = (idx, value) => {
    if (value !== '') {
      value = parseFloat(value)
    }
    const newIndices = [...indices]
    newIndices[idx].value = value
    setIndices(newIndices)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < indices.length; i++) {
      if (indices[i].value === '') {
        swal('Error', 'Debe llenar todos los campos', 'error')
        return
      }
    }
    const inputToFetch = indices.map((indice) => {
      return indice.value
    })
    fetchData({ inputToFetch: [inputToFetch] })
      .then((res) => res.data)
      .then((res) => {
        setData(res.resultado[0])
        setError(null)
        swal({
          title: '¡Enhorabuena!',
          text: 'Se ha predecido el rendimiento con éxito',
          icon: 'success',
          buttons: false,
          timer: 2000
        })
      })
      .catch((error) => {
        setError(error)
        setData(null)
        swal({
          title: 'Error',
          text: 'Ha ocurrido un error al intertar predecir el rendimiento',
          icon: 'error',
          buttons: false,
          timer: 2000
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClean = () => {
    setIndices(JSON.parse(JSON.stringify(initialIndices)))
    setData(null)
    // hacer un swal con temporizador
    swal({
      title: 'Limpio',
      text: 'Se limpiaron los campos',
      icon: 'success',
      buttons: false,
      timer: 1000
    })
  }

  return (
    <div className='form-indices__wrapper'>
      <form
        className={`form-indices ${loading ? 'disabled' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className='form-indices__container'>
          {indices.map((indice, idx) => {
            return (
              <div key={indice.id} className='field_continer'>
                <label htmlFor={indice.id}>{indice.label}</label>
                <input
                  id={indice.id}
                  type={indice.type}
                  value={indices[idx].value}
                  // min='0'
                  step={indice.type === 'number' ? '0.1' : null}
                  onChange={(e) => handleSetIndices(idx, e.target.value)}
                />
              </div>
            )
          })}
        </div>
        <div className='form-indices__buttons'>
          <button type='button' onClick={handleClean}>
            Limpiar
          </button>
          <button type='submit'>Predecir</button>
        </div>
        <div className='form-indices__result'>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {data && <p>Resultado de prediccion: {JSON.stringify(data)}</p>}
        </div>
      </form>
    </div>
  )
}
