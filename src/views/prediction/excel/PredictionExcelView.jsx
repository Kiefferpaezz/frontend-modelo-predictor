import './PredictionExcelView.css'
import { FiArrowLeft } from 'react-icons/fi'
import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import swal from 'sweetalert'
// import dataToProcess from '../../../assets/data/in_model_example.json'
import dataToGraficExample from '../../../assets/data/dataExample.json'
import {
  columnNames,
  fetchData,
  processData
} from '../../../assets/utils/utils'
import { useNavigate } from 'react-router-dom'
import CustomResponsiveLine from '../../../components/grafica/CustomResponsiveLine'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

function jsonToXlsx(data, filename) {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

const procesarFilaInput = (data) => {
  let res = {}
  for (let i = 0; i < columnNames.length; i++) {
    res[columnNames[i]] = data[i]
  }
  return res
}

const procesarJsonToXlsx = (results, input) => {
  const res = []
  for (let i = 0; i < results.length; i++) {
    res.push({
      ...procesarFilaInput(input[i]),
      Prediccion: results[i]
    })
  }
  console.log(res)
  return res
}

function xlsxToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      resolve(jsonData)
    }

    reader.onerror = (e) => {
      reject(e)
    }

    reader.readAsArrayBuffer(file)
  })
}

function getDataExample() {
  return {
    axisBottomLegend: 'Datos de ejemplo',
    axisLeftLegend: 'Datos de ejemplo',
    data: dataToGraficExample
  }
}

export default function PredictionExcelView() {
  const [data, setData] = useState(null)
  const [input, setInput] = useState(null)
  const [responseOriginal, setResponseOriginal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const chartRef = useRef(null)

  const handleGoBack = () => {
    navigate('/')
  }

  const changeFile = (e) => {
    setFile(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      swal('Error', 'Debe seleccionar un archivo', 'error')
    }
    xlsxToJson(file)
      .then((res) => {
        // si la primera fila es el nombre de las columnas la elimino
        if (isNaN(res[0][0])) {
          res.shift()
        }
        // si algun campo esta vacio o no es un numero mandar error
        let error = false
        for (let i = 0; i < res.length; i++) {
          if (res[i].length !== columnNames.length) {
            error = true
            break
          }
          for (let j = 0; j < res[i].length; j++) {
            if (res[i][j] === '' || isNaN(res[i][j])) {
              error = true
              break
            }
          }
          if (error) {
            break
          }
        }
        if (error) {
          setData(null)
          swal('Error', 'El archivo contiene datos incorrectos', 'error')
          return
        }
        // si no hay error
        setLoading(true)
        setError(null)
        console.log(res)
        setInput(res)
        fetchData({ inputToFetch: res })
          .then((res) => res.data)
          .then((res) => {
            setResponseOriginal(res.resultado[0])
            const dataProcesed = processData(res.resultado)
            setData(dataProcesed)
            setError(null)
            swal({
              title: '¡Enhorabuena!',
              text: 'Se ha predecido el rendimiento con éxito',
              icon: 'success',
              buttons: false,
              timer: 2000
            })
          })
          .catch((err) => {
            setError(err)
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
      })
      .catch((err) => {
        swal('Hubo un error al procesar los datos', err, 'error')
      })
  }
  const handleDownloadPrediction = () => {
    try {
      const dataProcesed = procesarJsonToXlsx(responseOriginal, input)
      jsonToXlsx(dataProcesed, 'prediccion')
    } catch (err) {
      swal('Error', 'Hubo un error al descargar el archivo', 'error')
    }
  }

  const handleDownloadGrafica = () => {
    try {
      domtoimage.toBlob(chartRef.current).then(function (blob) {
        saveAs(blob, 'grafica.png')
      })
    } catch (err) {
      swal('Error', 'Hubo un error al descargar la gráfica', 'error')
    }
  }

  return (
    <div className='predic_excel_view'>
      <div className='predic_excel_view__container'>
        <div className='predic_excel_view__container__background'>
          <img
            src='/img/logosimbolo-vertical.png'
            alt='background'
            className='pv_img_backgroung unselectable'
          />
        </div>
        <div className='predic_excel_view__container__header'>
          <span
            className='predic_excel_view__container__header__icon_back'
            onClick={handleGoBack}
          >
            <FiArrowLeft />
          </span>
          <div className='predic_excel_view__container__title'>
            <h1>US Stock Performance Predictor</h1>
          </div>
          <span className='span_aux'>{':)'}</span>
        </div>
        <div className='predic_excel_view__container__content'>
          <div className='predic_excel_view__container__content__form'>
            <form className='form-file_excel' onSubmit={handleSubmit}>
              <div className='form-file-excel_field_continer'>
                <label htmlFor='fileinput' className='form-file-excel__label'>
                  Seleccione un archivo excel con los datos:
                </label>
                <input
                  type='file'
                  id='fileinput'
                  name='fileinput'
                  accept='.xlsx'
                  className='form-file-excel__input'
                  onChange={changeFile}
                />
              </div>
              <div className='form-file-excel__buttons'>
                <button type='submit'>Predecir</button>
                <button
                  type='button'
                  className={data ? '' : 'disabled'}
                  onClick={handleDownloadPrediction}
                >
                  Descargar predicción
                </button>
                <button
                  type='button'
                  className={data ? '' : 'disabled'}
                  onClick={handleDownloadGrafica}
                >
                  Descargar grafica
                </button>
              </div>
              <div className='predic_excel_view_footer'>
                {loading && <h1>Cargando...</h1>}
                {error && <h1>Ha ocurrido un error</h1>}
                <div
                  ref={chartRef}
                  className='predic_excel_view__content__grafica'
                >
                  <CustomResponsiveLine data={data ? data : getDataExample()} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
