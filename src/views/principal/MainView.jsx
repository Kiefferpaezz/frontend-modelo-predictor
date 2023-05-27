import './MainView.css'
import FormIndices from "../../components/FormIndices"
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'


export default function MainView() {
    const navigate = useNavigate()
    return (
        <div className="container">
            <BsFillArrowLeftCircleFill className="btn-back" onClick={() => navigate('/')} />
            <FormIndices />
            <img className="logo" src="/img/logosimbolo-vertical.png" alt="logo-udea" />
        </div>
    )
}

