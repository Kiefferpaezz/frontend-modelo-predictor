import { BrowserRouter, Routes, Route } from "react-router-dom";

import InicioView from "../views/inicio/InicioView";
import MainView from "../views/principal/MainView";
import VistaGrafico from "../views/vistaGrafico/vistaGrafico";

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InicioView />} />
                <Route path="/main" element={<MainView />} />
                <Route path="/grafico" element={<VistaGrafico />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;