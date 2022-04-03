import axios from "axios";
import { useState, useContext } from "react";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import UserDataContext from "./../../contexts/UserDataContext";
import CountContext from "./../../contexts/CountContext";

import deleteIcon from "./../../Assets/img/delete-icon.svg";

export default function Habit({ id, name, days, updateHabits }) {
  const { userData } = useContext(UserDataContext);
  const { count, setCount } = useContext(CountContext);
  const [deleteHabit, setDeleteHabit] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingSvg = <ThreeDots width="51px" color="#fff" />;

  //dayjs
  var isToday = require('dayjs/plugin/isToday');
  dayjs.extend(isToday);


  function confirmDelete(id) {
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    setLoading(true);


    for(let day of days) {
      if(dayjs().day(day).isToday()) { // checa se o habito deletado e de hoje, se sim atualiza o progressbar
        setCount({done: count.done.filter(habit => habit.id !== id), total: count.total - 1})
      }
    }

    axios
      .delete(URL, config)
      .then(() => {
        console.log("entro aqui");
        setLoading(false);
        updateHabits(id);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }

  return (
    <HabitContainer key={id}>
      <ConfirmDelete deleteHabit={deleteHabit}>
        <h2>Deletar habito ?</h2>
        <div className="buttons">
          <button disabled={loading} onClick={() => setDeleteHabit(false)}>
            Cancelar
          </button>
          <button disabled={loading} onClick={() => confirmDelete(id)}>
            {loading ? loadingSvg : "Confirmar"}
          </button>
        </div>
      </ConfirmDelete>
      <h2>{name}</h2>
      <img
        src={deleteIcon}
        alt="delete habit"
        onClick={() => setDeleteHabit(true)}
      />
      <div className="days">
        <div className={days.includes(0) ? "selected" : undefined}>D</div>
        <div className={days.includes(1) ? "selected" : undefined}>S</div>
        <div className={days.includes(2) ? "selected" : undefined}>T</div>
        <div className={days.includes(3) ? "selected" : undefined}>Q</div>
        <div className={days.includes(4) ? "selected" : undefined}>Q</div>
        <div className={days.includes(5) ? "selected" : undefined}>S</div>
        <div className={days.includes(6) ? "selected" : undefined}>S</div>
      </div>
    </HabitContainer>
  );
}

const HabitContainer = styled.div`
  width: 384px;
  height: 100px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #fff;
  margin: 20px auto;
  padding-left: 21px;
  position: relative;

  h2 {
    color: #666666;
    font-size: 20px;
    font-weight: 400;
  }

  img {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 18px;
    color: #666666;
  }

  .days {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #dbdbdb;
  }

  .days div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin-right: 6px;
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    font-size: 20px;
    cursor: pointer;
  }

  .selected {
    background-color: #cfcfcf;
    color: #fff;
  }
`;

const ConfirmDelete = styled.div`
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: ${(props) => (props.deleteHabit ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  border-radius: 5px;

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .buttons button {
    width: 84px;
    height: 34px;
    font-size: 16px;
    margin: 0;
  }

  .buttons button:first-child {
    background-color: #fff;
    color: #52b6ff;
  }

  .buttons button:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
