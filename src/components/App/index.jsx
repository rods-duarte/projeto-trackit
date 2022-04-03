import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserDataContext from "../../contexts/UserDataContext";
import TodayHabitsContext from "./../../contexts/TodayHabitsContext";
import CountContext from "../../contexts/CountContext";

import LoginPage from "./../LoginPage/";
import RegisterPage from "./../RegisterPage/";
import HabitsPage from "./../HabitsPage/";
import TodayPage from "./../TodayPage/";
import HistoricPage from "./../HistoricPage/";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [count, setCount] = useState({done: [], total: 0});
  const [habitsToDo, setHabitsToDo] = useState(null);

  return (
    <BrowserRouter>
      <UserDataContext.Provider value={{ userData, setUserData }}>
          <TodayHabitsContext.Provider value={{habitsToDo, setHabitsToDo}}>
            <CountContext.Provider value={{ count, setCount }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/habitos" element={<HabitsPage />} />
                <Route path="/hoje" element={<TodayPage />} />
                <Route path="/historico" element={<HistoricPage />} />
              </Routes>
            </CountContext.Provider>
          </TodayHabitsContext.Provider>
      </UserDataContext.Provider>
    </BrowserRouter>
  );
}
