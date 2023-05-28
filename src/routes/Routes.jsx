import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NotFound from '../views/notfound/NotFound'
import HomeView from '../views/home/HomeView'
import PredictionView from '../views/prediction/PredictionView'
import PredictionExcelView from '../views/prediction/excel/PredictionExcelView'

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path='prediction/'>
          <Route index element={<PredictionView />} />
          <Route path='excel' element={<PredictionExcelView />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
