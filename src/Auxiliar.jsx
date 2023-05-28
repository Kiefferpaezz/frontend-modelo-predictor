import axios from 'axios'
import { useState } from 'react'

import CustomResponsiveLine from '../../components/grafica/CustomResponsiveLine'

// export const BASE_URL = 'http://127.0.0.1:8000'
// export const API_URL = `${BASE_URL}/predict`
import dataToFetch from '../../assets/data/in_model_example.json'

export default function HomeView() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.post(API_URL, {
        datos: dataToFetch
      })
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleFetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchData()
        .then((res) => res.data)
        .then((res) => res.resultado)
      const myData = {
        axisBottomLegend: 'Nro muestras',
        axisLeftLegend: 'Rendimiento',
        data: [
          {
            id: 'Predicted',
            color: 'hsl(8, 70%, 50%)',
            data: response[0].map((item, index) => {
              return {
                x: index,
                y: item
              }
            })
          }
        ]
      }
      console.log(myData)
      setData(myData)
      setError(null)
    } catch (error) {
      setError(error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleClickFetchData = () => {
    handleFetchData()
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClickFetchData}>Fetch Data</button>
      {data && (
        <div
          style={{
            width: '1000px',
            height: '500px',
            backgroundColor: 'white',
            margin: '0 auto',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          <CustomResponsiveLine data={data} />
        </div>
      )}
      {error && <p>There was an error, please try again</p>}
      {loading && <p>Loading...</p>}
    </div>
  )
}
