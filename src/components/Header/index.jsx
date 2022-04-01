import { useContext } from "react";
import styled from "styled-components";

import UserDataContext from "./../../contexts/UserDataContext";

import trackIt from "./../../Assets/img/TrackIt.svg";

export default function Header() {
  const {userData} = useContext(UserDataContext);
  const {image, name} = userData;
  return (
    <StyledHeader>
      <img className="logo" src={trackIt} alt="TrackIt" />
      <img className="profile-pic" src={image} alt={name} />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;

  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  img {margin: 0 20px}

  .profile-pic {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    object-fit: cover;
  }

  .logo {
      width: 120px;
  }
`;
