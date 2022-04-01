import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

import Header from "./../Header/";
import Menu from "./../Menu/";

import UserDataContext from "./../../contexts/UserDataContext";

export default function TodayPage() {
  const { userData, setUserData } = useContext(UserDataContext);
  const [todayHabits, setTodayHabits] = useState(null);

  const dayjs = require("dayjs");
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekdays: [
      "Domingo",
      "Segunda",
      "Terca",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
    ],
  });

  useEffect(() => {
    //Checa se o usuário está logado
    let localData = localStorage.getItem("userData");
    setUserData({ ...JSON.parse(localData) });
  }, []);

  useEffect(() => {
    //Faz a requisição para pegar os habits do dia
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    let config;

    if (userData) {
      config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      axios
        .get(URL, config)
        .then((response) => setTodayHabits(response.data))
        .catch((err) => console.log(err.response));
    }
  }, [userData]);

  function buildHabits() {
      
  }

  return (
    <Today>
      {userData && (
        <>
          <Header />
          <Container>
            <h1>{dayjs().format("dddd, DD/MM")}</h1>
            {buildHabits()}
          </Container>
          <Menu />
        </>
      )}
    </Today>
  );
}

const Today = styled.main`
  min-height: 100vh;
  background-color: #e5e5e5;

  h1 {
    color: #126ba5;
    font-size: 23px;
    font-weight: 400;
    margin-top: 30px;
  }
`;

const Container = styled.div`
  margin-left: 20px;
`;
