import {useState, useEffect, useContext} from "react";
import styled from "styled-components";

import UserDataContext from "./../../contexts/UserDataContext";

export default function TodayPage() {
    const {userData, setUserData} = useContext(UserDataContext);
    console.log(userData);
    return (
        <Today>
            <h1>TELA TODAY</h1>
            
        </Today>
    );
}

const Today = styled.main`

`