import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import './vistaGraficoView.css';

export default function VistaGrafico() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);

        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const jsonData = XLSX.utils.sheet_to_json(ws);
            setData(jsonData);
        };
    }

  


    const generateChartData = () => {
        const labels = data.map((row) => row.label); // Reemplaza 'label' por la columna apropiada del archivo Excel
        const values = data.map((row) => row.value); // Reemplaza 'value' por la columna apropiada del archivo Excel

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Data',
                    data: values,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                },
            ],
        };
    };

    return (
        <div className="container">
            <BsFillArrowLeftCircleFill className="btn-back" onClick={() => navigate('/')} />
            <form>
                <label htmlFor="file">Cargar archivo xlsx</label>
                <input id="file" type="file" accept=".xlsx" onChange={handleFileChange} />
            </form>
            {file && <p>Selected file: {file.name}</p>}
            {data && <Line data={generateChartData()} width={800} height={400} />}
        </div>
    );
}
