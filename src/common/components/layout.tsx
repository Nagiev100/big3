import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const Layout: FC = () => {
  return (
    <>
      <Container>
        <HeaderLayout>
          <Header />
        </HeaderLayout>
        <Main>
          <MySideBarLayout>
            <Sidebar />
          </MySideBarLayout>
          <Section>
            <Outlet />
          </Section>
        </Main>
      </Container>
    </>
  );
};
export const MySideBarLayout = styled.section`
  max-width: 140px;
  position: fixed;
  height: calc(100vh - 80px);
  width: 140px;
  display: flex;
  flex-direction: column;
  background: white;
  bottom: 0;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
const Container = styled.div`
  height: 100vh;
  background-color: #f6f6f6;
`;
const HeaderLayout = styled.header`
  position: fixed;
  z-index: 98;
  display: flex;
  width: 100vw;
  height: 80px;
  background: white;
  box-shadow: 0 1px 10px 0 rgba(209, 209, 209, 0.5);
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 140px 1fr;
  min-height: calc(100vh - 80px);
  flex: 1;
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const Section = styled.section`
  background-color: #f6f6f6;
  margin-top: 80px;
  width: calc(100vw - 140px);
  min-height: 100%;
  margin-left: 140px;
  @media ${(props) => props.theme.mobile} {
    margin-left: 0;
    width: 100%;
  }
`;
