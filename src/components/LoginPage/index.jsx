import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import UserDataContext from "../../contexts/UserDataContext";

import logo from "./../../Assets/img/logo.svg";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({});
  const { setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadingSvg = <ThreeDots width="51px" color="#fff" />;


  function confirmLogin(event) {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    event.preventDefault();
    setLoading(true);
    axios
      .post(URL, credentials)
      .then((response) => {
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data))
        navigate("/hoje");
      })
      .catch((err) => {
        //TODO INFORMAR QUAL O ERRO PRO USUARIO...
        alert("DEU RUIM !!!");
        setLoading(false);
      });
  }

  return (
    <Login>
      <img src={logo} alt="Logo" />
      <form onSubmit={confirmLogin}>
        <input
          type="email"
          placeholder="email"
          disabled={loading}
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          disabled={loading}
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button disabled={loading} type="submit">
          {loading ? loadingSvg : "Entrar"}
        </button>
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
    opacity: ${(props) => (props.loading ? 0.5 : 1)};
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
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 21px;
    color: #fff;
  }
`;
