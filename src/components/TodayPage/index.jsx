import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

import Header from "./../Header/";
import Menu from "./../Menu/";
import TodayHabit from "./../TodayHabit/";

import UserDataContext from "./../../contexts/UserDataContext";
import CountContext from "../../contexts/CountContext";

export default function TodayPage() {
  const { userData, setUserData } = useContext(UserDataContext);
  const { count, setCount } = useContext(CountContext);
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

  const loadingListSvg = (
    <div className="loading-container">
      <RotatingLines width="100px" strokeColor="#126BA5"></RotatingLines>
    </div>
  );

  useEffect(() => {
    //Faz a requisição para pegar os habits do dia
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    let config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    axios
      .get(URL, config)
      .then((response) => {
        setTodayHabits(response.data);
        setCount({
          //TODO TALVEZ SO habit.done sirva
          done: response.data.filter((habit) => habit.done),
          total: response.data.length,
        });
      })
      .catch((err) => console.log(err.response));
  }, []);

  function subtitle() {
    const { done, total } = count;
    if (total === 0) return;

    return (
      <Subtitle count={count}>
        {done.length
          ? `${Math.floor((done.length * 100) / total)}% dos hábitos concluídos`
          : "Nenhum hábito concluído ainda"}
      </Subtitle>
    );
  }

  function buildHabits() {
    if (todayHabits === null) return loadingListSvg;

    if (todayHabits.length === 0)
      return <p>Você não tem nenhum hábito para hoje.</p>;

    return todayHabits.map((habit) => {
      return (
        <TodayHabit key={habit.id} habit={habit} todayHabits={todayHabits} />
      );
    });
  }

  return (
    <Today>
      {userData && (
        <>
          <Header />
          <Container>
            <h1>{dayjs().format("dddd, DD/MM")}</h1>
            {subtitle()}
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
  margin-bottom: 80px;

  h1 {
    color: #126ba5;
    font-size: 23px;
    font-weight: 400;
    margin-top: 30px;
  }

  .loading-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 150px;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    color: #666;
    margin-top: 5px;
  }
`;

const Container = styled.div`
  padding-left: 20px;
`;

const Subtitle = styled.h3`
  color: ${(props) => (props.count.done.length ? "#8FC549" : "#BABABA")};
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  margin-top: 5px;
  margin-bottom: 20px;
`;
