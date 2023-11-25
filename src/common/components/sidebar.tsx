import React, {FC} from "react";
import GroupIcons from "../../assests/icons/group_person_rounded.svg";
import {Link, NavLink, useNavigate} from "react-router-dom";
import PersonIcons from "../../assests/icons/person_rounded.svg";
import OutIcons from "../../assests/icons/outIcons.png";
import styled from "styled-components";


export const Sidebar : FC = () => {
    const navigate = useNavigate()
    const out = () => {
        localStorage.removeItem("token")
        navigate('/')
    }
    return(
        <>
            <Container>
                <Wrap>
                    <NavLink to="teamsCard" style={({isActive}) => ({color: isActive ? '#E4163A' : '#9C9C9C' })}>
                        <ImgGroupIcons src={GroupIcons} />
                        <TextIcons>Teams</TextIcons>
                    </NavLink>
                    <Link to="playersCard">
                        <ImgPersonIcons src={PersonIcons}/>
                        <TextIcons>Players</TextIcons>
                    </Link>
                </Wrap>
                <ButtonSaybar onClick={out}>
                    <ButtonImg src={OutIcons}/>
                    <ButtonText>Sign out</ButtonText>
                </ButtonSaybar>
            </Container>
        </>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width:100%;
  height: 100%;
`
const Wrap = styled.div`
  width:100%;
  height: 100%;
  margin-left: 51px;
  margin-top: 32px;
`
const ImgGroupIcons = styled.img`
  width:24px;
  height: 24px;
  margin-left: 7px;
`

const TextIcons = styled.p`
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #9C9C9C;
  width: 38px;
`
const ImgPersonIcons = styled.img`
  width:24px;
  height: 24px;
  margin-left: 7px;
  margin-top: 36px;
`
const ButtonSaybar = styled.button`
  display: flex;
  flex-direction: column;
  border: none;
  background-color: #FFF;
`
const ButtonImg = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
`
const ButtonText = styled.p`
  width: 46px;
  height: 18px;
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #FF768E;
  margin-left: 47px;
  margin-bottom: 32px;
`





