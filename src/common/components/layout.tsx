import React, { FC } from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {Header} from "./header";
import {Sidebar} from "./sidebar";

export const Layout: FC = () => {
    return (
    <>
        <Container>
            <HeaderLayout>
                <Header/>
            </HeaderLayout>
            <Main>
                <SideBarLayout>
                    <Sidebar/>
                </SideBarLayout>
                <Section>
                    <Outlet />
                </Section>
            </Main>
        </Container>
    </>
  );
};
const Container = styled.div`
  /*width: 100vw;
  height: 100vh;*/
  height: 100vh;
  background-color: #f6f6f6;
`
const HeaderLayout = styled.header`
  position: fixed;
  z-index: 99;
  display: flex;
  width: 100vw;
  height: 80px;
  background: white;
  box-shadow: 0 1px 10px 0 rgba(209, 209, 209, 0.50);
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 140px 1fr;
  min-height: calc(100vh - 80px);
  flex: 1;
`;
const SideBarLayout = styled.section`
  max-width: 140px;
  position: fixed;
  height: calc(100vh - 80px);
  width: 140px;
  display: flex;
  flex-direction: column;
  background: white;
  bottom: 0;
`;
const Section = styled.section`
  background-color: #f6f6f6;
  margin-top: 80px;
  width: calc(100vw - 80px);
  min-height: 100%;
  margin-left: 140px;
`;

