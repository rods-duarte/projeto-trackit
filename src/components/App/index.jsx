import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserDataContext from "../../contexts/UserDataContext";

import LoginPage from "./../LoginPage/";
import RegisterPage from "./../RegisterPage/";
import HabitsPage from "./../HabitsPage/";
import TodayPage from "./../TodayPage/";
import HistoricsPage from "./../HistoricPage/";

export default function App() {
  const [userData, setUserData] = useState();
  return (
    <BrowserRouter>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/habitos" element={<HabitsPage />} />
          <Route path="/hoje" element={<TodayPage />} />
          <Route path="/historico" element={<HistoricsPage />} />
        </Routes>
      </UserDataContext.Provider>
    </BrowserRouter>
  );
}
