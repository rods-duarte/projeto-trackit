import styled from "styled-components";

import Header from "./../Header/";
import Menu from "./../Menu/";

export default function HistoricPage() {
    return (
        <Historic>
            <Header />
            <h1>Historico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Menu />
        </Historic>
    );
}

const Historic = styled.main`
    min-height: 100vh;
    background-color: #e5e5e5;
    margin-bottom: 80px;

    h1 {
        color: #126BA5;
        font-size: 23px;
        font-weight: 400;
        margin-top: 30px;
        margin-left: 20px;
    }

    p {
        color: #666;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 20px;
    }
`