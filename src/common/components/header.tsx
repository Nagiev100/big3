import React, {FC, useEffect} from "react";
import HeaderLogo from '../../assests/images/logoHeader (1).png';
import UserImg from '../../assests/icons/user.png';
import styled from "styled-components";
import {useAppSelector} from "../../core/redux/store";



export const Header : FC = () => {
    const selector = useAppSelector((store) =>store.userName)
   /* useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token){
            const decodingToken = decodeToken(token)
        }
    },[])*/

    return(
        <>
            <Container>
                <LogoHeader src={HeaderLogo} />
                <UserHeader>
                    <UserName>{selector.userName}</UserName>
                    <Img src={UserImg}/>
                </UserHeader>
            </Container>
        </>
    )
}
const Container = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`
const LogoHeader = styled.img`
  width: 191px;
  height: 48px;
  margin-left: 51px;
`
const UserHeader= styled.div`
  display: flex;
  align-items: center;
  margin-right: 51px;
`
const Img = styled.img`
  width: 36px;
  height: 36px;
`
const UserName =styled.p`
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #303030;
  padding-right: 16px;
`