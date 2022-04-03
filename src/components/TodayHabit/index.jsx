import axios from "axios";
import { useState, useContext } from "react";
import styled from "styled-components";

import UserDataContext from "../../contexts/UserDataContext";
import CountContext from "../../contexts/CountContext";

import checkSvg from "./../../Assets/img/check.svg";

export default function TodayHabit({ habit }) {
  const { id, name, done, currentSequence, highestSequence } = habit;
  const { userData } = useContext(UserDataContext);
  const { count, setCount } = useContext(CountContext);
  const [isDone, setIsDone] = useState(done);
  const [streak, setStreak] = useState({
    current: currentSequence,
    record: highestSequence,
  });

  function checkHabit() {
    const occupation = isDone ? "uncheck" : "check";
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${occupation}`;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    updateCount();
    updateStreak();
    setIsDone(!isDone);

    axios
      .post(URL, undefined, config)
      .then(() => {})
      .catch((err) => console.log(err.response));
  }

  function updateCount() {
    if (isDone) {
      setCount({
        ...count,
        done: count.done.filter((habit) => habit.id !== id),
      });
    } else {
      setCount({ ...count, done: [...count.done, habit] });
    }
  }

  function updateStreak() {
    if (isDone) {
      if (streak.current === streak.record) {
        setStreak({ current: streak.current - 1, record: streak.record - 1 });
      } else {
        setStreak({ ...streak, current: streak.current - 1 });
      }
    } else {
      if (streak.current === streak.record) {
        setStreak({ current: streak.current + 1, record: streak.record + 1 });
      } else {
        setStreak({ ...streak, current: streak.current + 1 });
      }
    }
  }

  function getStreak() {
    var isRecord =
      isDone && streak.current !== 0 && streak.current === streak.record;

    const current = (
      <CurrentStreak isDone={isDone}>{streak.current} dias</CurrentStreak>
    );
    const record = (
      <RecordStreak isRecord={isRecord} className="sequencia-recorde">
        {streak.record} dias
      </RecordStreak>
    );

    return (
      <div>
        <span>Sequencia atual: {current}</span>
        <span>Seu recorde: {record}</span>
      </div>
    );
  }

  return (
    <Habit>
      <div className="text">
        <h2>{name}</h2>
        {getStreak()}
      </div>
      <Checkbox isDone={isDone} onClick={checkHabit}>
        <img src={checkSvg} alt="CheckBox" />
      </Checkbox>
    </Habit>
  );
}

const Habit = styled.div`
  width: 384px;
  height: 94px;
  margin: 10px 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;

  div {
    display: flex;
    flex-direction: column;
  }

  h2,
  span {
    font-size: 20px;
    font-weight: 400;
    color: #666666;
  }

  h2 {
    margin: 5px 0;
  }

  span {
    font-size: 13px;
    line-height: 16px;
  }

  .text {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Checkbox = styled.div`
  justify-content: center;
  align-items: center;
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.isDone ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;

  img {
    width: 30px;
    color: #fff;
  }
`;

const CurrentStreak = styled.span`
  color: ${(props) => (props.isDone ? "#8EC648" : "#666")} !important;
`;

const RecordStreak = styled.span`
  color: ${(props) => (props.isRecord ? "#8EC648" : "#666")} !important;
`;
