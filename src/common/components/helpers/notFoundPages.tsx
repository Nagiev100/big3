import { FC } from "react";
import styled from "styled-components";
import NotFoundPage from '../../../assests/images/found404.png'

export const NotFoundPages: FC = () => {
  return (
      <Container>
        <Wrapper>
            <ImgNotFound src={NotFoundPage}/>
            <SloganPage>Page not found</SloganPage>
            <MessagePage>Sorry, we can’t find what you’re looking for</MessagePage>
        </Wrapper>
      </Container>
  )
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  left: 37%;
  top: 153px;
  
`
const ImgNotFound = styled.img`
  width: 380px;
  height: 212px;
`
const SloganPage = styled.h1`
  font-family: Avenir;
  font-size: 36px;
  font-weight: 800;
  line-height: 49px;
  color: #FF768E;
  margin-left: 40px;
  margin-top: 27px;
`
const MessagePage = styled.p`
  color: #707070;
  font-family: Avenir;
  font-size: 24px;
  font-weight: 400;
  padding-top: 14px;
`
