import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import logo from "./../../Assets/img/logo.svg";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({});
  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
  console.log(credentials);

  function confirmLogin(event) {
    event.preventDefault();

    axios
      .post(URL, credentials)
      .then((response) => {
        //TODO ENVIAR PARA ROTA HOJE
      })
      .catch((err) => {
        //TODO INFORMAR ERRO NO LOGIN
        console.log("DEU RUIM!!!");
      });
  }

  return (
    <Login>
      <img src={logo} alt="Logo" />
      <form onSubmit={confirmLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <button type="submit">Entrar</button>
      </form>
      <Link to="/cadastro">
        <span>Não tem uma conta? Cadastre-se!</span>
      </Link>
    </Login>
  );
}

const Login = styled.main`
  width: 100%;
  min-height: 100vh;
  margin-top: 40px;

  img {
    display: block;
    margin: 0 auto;
    width: 180px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin: 5px 0;
  }

  span {
    display: block;
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #52b6ff;
    text-decoration: underline;
  }

  button {
    width: 303px;
    height: 45px;
    margin-top: 5px;
    margin-bottom: 20px;
    border: none;

    background-color: #52b6ff;
    border-radius: 5px;

    font-size: 21px;
    color: #fff;
  }
`;
