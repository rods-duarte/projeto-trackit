import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

import UserDataContext from "./../../contexts/UserDataContext";

import Header from "./../Header/";
import Menu from "./../Menu/";
import Habit from "./../Habit/";

export default function HabitsPage() {
  //TODO Adicionar animacao de loading quando habito e criado
  const { userData, setUserData } = useContext(UserDataContext); //dados globais
  const [habits, setHabits] = useState(null);
  const [newHabit, setNewHabit] = useState(null);
  let config;

  useEffect(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    axios
      .get(URL, config)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  function buildHabitsList() {
    if (habits === null) {
      return (
        <div className="loading-container">
          <RotatingLines width="100px" strokeColor="#126BA5"></RotatingLines>
        </div>
      );
    }
    if (habits.length === 0) {
      return (
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </p>
      );
    }

    return habits.map((habit) => {
      //TODO SOLUCIONAR
      const { id, name, days } = habit;
      return (
        <Habit
          key={id}
          id={id}
          name={name}
          days={days}
          updateHabits={(id) =>
            setHabits(habits.filter((habit) => habit.id !== id))
          }
        />
      );
    });
  }

  function buildNewHabit() {
    return (
      <NewHabit>
        <form onSubmit={confirmNewHabit}>
          <input
            type="text"
            placeholder="nome do habito"
            onChange={(e) => {
              setNewHabit({ ...newHabit, name: e.target.value });
            }}
          />
          <div className="days">
            <div
              onClick={(e) => {
                selectDay(e, 1);
              }}
            >
              D
            </div>
            <div
              onClick={(e) => {
                selectDay(e, 2);
              }}
            >
              S
            </div>
            <div
              onClick={(e) => {
                selectDay(e, 3);
              }}
            >
              T
            </div>
            <div
              onClick={(e) => {
                selectDay(e, 4);
              }}
            >
              Q
            </div>
            <div
              onClick={(e) => {
                selectDay(e, 5);
              }}
            >
              Q
            </div>
            <div
              onClick={(e) => {
                selectDay(e, 6);
              }}
            >
              S
            </div>
            <div
              onClick={(e) => {
                selectDay(e, 7);
              }}
            >
              S
            </div>
          </div>
          <div className="buttons">
            <button onClick={() => setNewHabit(null)}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </NewHabit>
    );
  }

  function selectDay(e, i) {
    if (newHabit.days.includes(i)) {
      setNewHabit({ ...newHabit, days: newHabit.days.filter((j) => j !== i) });
      e.target.classList.remove("selected");
    } else {
      setNewHabit({ ...newHabit, days: [...newHabit.days, i] });
      e.target.classList.add("selected");
    }
  }

  function confirmNewHabit(e) {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    e.preventDefault();
    config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    axios.post(URL, newHabit, config).then((response) => {
      setHabits([...habits, response.data]);
      setNewHabit(null);
      console.log("ENVIOU O NOVO HABITO");
    });
  }

  return (
    <Habits>
      <Header></Header>
      <div className="top">
        <h1>Meus habitos</h1>
        <button onClick={() => setNewHabit({ name: "", days: [] })}>
          <span>+</span>
        </button>
      </div>
      {newHabit && buildNewHabit()}
      {buildHabitsList()}
      <Menu></Menu>
    </Habits>
  );
}

const Habits = styled.main`
  min-height: 100vh;
  background-color: #e5e5e5;
  padding-bottom: 100px;

  .top {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 23px;
    color: #126ba5;
    margin-left: 20px;
    font-weight: 400;
  }

  p {
    margin-top: 30px;
    font-size: 18px;
    color: #666666;
    margin-left: 20px;
  }

  button {
    width: 40px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #52b6ff;
    color: #fff;
    font-size: 27px;
    text-align: center;
    line-height: 35px;
    margin-right: 20px;
    padding: 0;
  }

  .loading-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NewHabit = styled.div`
  input {
    width: 340px;
    height: 45px;
    margin: 0 auto;

    background-color: #fff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }

  form {
    width: 384px;
    height: 180px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    margin: 25px auto;
    padding-top: 15px;
  }

  .days {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 21px;
    color: #dbdbdb;
  }

  .days div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin: 0 3px;
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    font-size: 20px;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .buttons button {
    width: 84px;
    height: 34px;
    font-size: 16px;
  }

  .buttons button:first-child {
    background-color: #fff;
    color: #52b6ff;
  }

  .selected {
    background-color: #cfcfcf;
    color: #fff;
  }
`;
