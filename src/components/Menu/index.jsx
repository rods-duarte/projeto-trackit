import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import CountContext from "./../../contexts/CountContext";

import "react-circular-progressbar/dist/styles.css";

//TODO Receber o valor em % dos habitos concluidos
export default function Menu() {
  const { count } = useContext(CountContext);
  const {done, total} = count;
  const value = total === 0 ? 0 : (done.length / total) * 100;
  return (
    <StyledMenu>
      <Link to="/habitos" className="link">
        <span>Habitos</span>
      </Link>
      <Link to="/hoje" className="container">
        <CircularProgressbar
          background
          backgroundPadding={6}
          value={value}
          text={"Hoje"}
          styles={buildStyles({
            backgroundColor: "#52B6FF",
            trailColor: "#52B6FF",
            pathColor: "#fff",
            textColor: "#fff",
            textSize: "18px",
          })}
        />
      </Link>
      <Link to="/historico" className="link">
        <span>Historico</span>
      </Link>
    </StyledMenu>
  );
}

const StyledMenu = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  max-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;

  background-color: #fff;

  span {
    margin: 0 20px;
    color: #52b6ff;
    font-size: 18px;
    font-weight: 400;
  }

  .link {
    text-decoration: none;
  }

  .container {
    width: 85px;
    margin-bottom: 20px;
  }
`;
