import axios from 'axios'
export const BASE_URL = 'http://127.0.0.1:8000'
export const API_URL = `${BASE_URL}/predict`

export const columnNames = [
  'operation income',
  'income before tax',
  'ebit',
  'ebitda',
  'net income',
  'operation cashflow',
  'open',
  'price to earnings ratio',
  'earnings per share'
]

export const initialIndices = [
  {
    id: 'operationInc',
    value: '',
    label: 'Operating Income:',
    type: 'number'
  },
  {
    id: 'inconTax',
    value: '',
    label: 'Income Before Tax:',
    type: 'number'
  },
  {
    id: 'ebit',
    value: '',
    label: 'Ebit:',
    type: 'number'
  },
  {
    id: 'ebitda',
    value: '',
    label: 'Ebitda:',
    type: 'number'
  },
  {
    id: 'netIncome',
    value: '',
    label: 'Net Income:',
    type: 'number'
  },
  {
    id: 'operationCash',
    value: '',
    label: 'Operating Cashflow:',
    type: 'number'
  },
  {
    id: 'open',
    value: '',
    label: 'Open:',
    type: 'number'
  },
  {
    id: 'priceEarning',
    value: '',
    label: 'Price To Earnings Ratio:',
    type: 'number'
  },
  {
    id: 'earningPS',
    value: '',
    label: 'Earnings Per Share:',
    type: 'number'
  }
]

export const fetchData = async ({ inputToFetch }) => {
  try {
    const response = await axios.post(API_URL, {
      datos: inputToFetch
    })
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const processData = (data) => {
  console.log('processData')
  const myData = {
    axisBottomLegend: 'Nro muestras',
    axisLeftLegend: 'Rendimiento',
    data: [
      {
        id: 'Predicted',
        color: 'hsl(8, 70%, 50%)',
        data: data[0].map((item, index) => {
          return {
            x: index,
            y: item
          }
        })
      }
    ]
  }
  return myData
}

export const processJsonToXslx = (data, columnNames) => {
  const jsonData = data.map((item, index) => {
    let fila = {}
    columnNames.forEach((col, index) => {
      fila[col] = item[index]
    })
    return fila
  })
  return jsonData
}
