import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import logo from "./../../Assets/img/logo.svg";

export default function RegisterPage() {
  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const loadingSvg = <ThreeDots width="51px" color="#fff"/>;

  console.log(newUser);

  function confirmRegister(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(URL, newUser)
      .then(() => navigate("/"))
      .catch((err) => {
        setLoading(false);
        alert("DEU RUIM !");
      });
  }

  return (
    <Register>
      <img src={logo} alt="Logo" />
      <form onSubmit={confirmRegister}>
        <input
          type="email"
          placeholder="email"
          disabled={loading}
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="senha"
          disabled={loading}
          value={newUser.password}
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
            e.target.value = newUser.password;
          }}
        />
        <input
          type="text"
          placeholder="nome"
          disabled={loading}
          value={newUser.name}
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
        <input
          type="url"
          placeholder="foto"
          disabled={loading}
          value={newUser.image}
          onChange={(e) => {
            setNewUser({ ...newUser, image: e.target.value });
          }}
        />
        <button disabled={loading} type="submit">{loading ? loadingSvg : "Cadastrar"}</button>
      </form>
      <Link to="/">
        <span>Já tem uma conta? Faça login!</span>
      </Link>
    </Register>
  );
}

const Register = styled.main`
  width: 100%;
  min-height: 100vh;
  margin-top: 40px;
  padding-bottom: 20px;

  img {
    display: block;
    width: 180px;
    margin: 0 auto;
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

    opacity: ${props => props.loading ? .5 : 1};
  }

  span {
    display: block;
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
    border-radius: 5px;
    background-color: #52b6ff;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 21px;
    color: #fff;
  }

`;
