import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LoginPage from './../LoginPage/';
import RegisterPage from './../RegisterPage/';
import HabitsPage from './../HabitsPage/';
import TodayPage from './../TodayPage/';
import HistoricsPage from './../HistoricPage/'


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/habitos" element={<HabitsPage />} />
                <Route path="/hoje" element={<TodayPage />} />
                <Route path="/historico" element={<HistoricsPage />} />
            </Routes>
        </BrowserRouter>
    )
}