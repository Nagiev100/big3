import React, { FC, useState } from "react";
import HeaderLogo from "../../assests/images/logoHeader (1).png";
import UserImg from "../../assests/icons/user.png";
import styled from "styled-components";
import MenuMobile from "../../assests/icons/menu_24px.png";
import { Sidebar } from "./sidebar";

export const Header: FC = () => {
  const name = localStorage.getItem("name");
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <Container>
        <HumburgerIcon onClick={toggleMenu}>
          <ImgMenu src={MenuMobile} />
        </HumburgerIcon>
        <LogoHeader src={HeaderLogo} />
        <UserHeader>
          <UserName>{name}</UserName>
          <Img src={UserImg} />
        </UserHeader>
      </Container>
      <Sidebar showMenu={showMenu} />
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const LogoHeader = styled.img`
  width: 191px;
  height: 48px;
  margin-left: 120px;
  @media ${(props) => props.theme.mobile} {
    width: 137px;
    height: 34px;
    margin-top: 19px;
  }
`;
export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-right: 51px;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
export const Img = styled.img`
  width: 36px;
  height: 36px;
`;
export const UserName = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #303030;
  padding-right: 16px;
`;
const HumburgerIcon = styled.div`
  position: fixed;
  display: none;
  @media ${(props) => props.theme.mobile} {
    display: block;
    cursor: pointer;
    z-index: 999;
  }
`;
const ImgMenu = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  margin-top: 19px;
`;
