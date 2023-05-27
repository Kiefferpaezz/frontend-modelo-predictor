import './FormIndices.css'
import { useState } from 'react'

const initialIndices = {
    priceEar: {
        id: 'priceEar',
        value: '',
        label: 'Price-to-Earnings (P/E) Ratio:',
        type: 'number'
    },
    priceSale: {
        id: 'priceSale',
        value: '',
        label: 'Price-to-Sales (P/S) Ratio:',
        type: 'number'
    },
    priceBook: {
        id: 'priceBook',
        value: '',
        label: 'Price-to-Book (P/B) Ratio:',
        type: 'number'
    },
    debtEquity: {
        id: 'debtEquity',
        value: '',
        label: 'Debt-to-Equity (D/E) Ratio:',
        type: 'number'
    },
    returnEquity: {
        id: 'returnEquity',
        value: '',
        label: 'Return on Equity (ROE):',
        type: 'number'
    },
    returnAssets: {
        id: 'returnAssets',
        value: '',
        label: 'Return on Assets (ROA):',
        type: 'number'
    }
}

export default function FormIndices({ onSubmit }) {
    const [indice, setIndice] = useState('')
    const [indices, setIndices] = useState(initialIndices)

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(indice)
        setIndice('')
    }

    function handleSetIndices(e) {
        const { id, value } = e.target
        setIndices(prevIndices => ({
            ...prevIndices,
            [id]: {
                ...prevIndices[id],
                value
            }
        }))
    }

    return (
        <div className='form-container'>
          <form className="form-indices" onSubmit={handleSubmit}>
            <main className='form-main'>
              {Object.keys(indices).map(key => {
                const indice = indices[key]
                return (
                  <div key={indice.id}> {/* Agregar key aquí */}
                    <label htmlFor={indice.id}>{indice.label}</label>
                    <input
                      id={indice.id}
                      type={indice.type}
                      value={indice.value}
                      onChange={handleSetIndices}
                    />
                  </div>
                )
              })}
            </main>
            <button type="submit">Enviar</button>
          </form>
          <div>
            <label>El resultado de su predicción fue:</label>
            <span>Resultado</span>
          </div>
        </div>
      )
      
}
