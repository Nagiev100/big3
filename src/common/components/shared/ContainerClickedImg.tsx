import styled from "styled-components";

interface ContainerClickedImg {
  marginTop?: string;
  marginLeft?: string;
  background?: string;
  backgroundImage?: string;
}

export const ContainerClickedImg = styled.div<ContainerClickedImg>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 366px;
  height: 261px;
  background-color: ${(props) => props.background};
  background-image: ${(props) => props.backgroundImage};
  border-radius: 10px;
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  background-repeat: no-repeat;
  background-size: cover;
  @media ${(props) => props.theme.tablet} {
    width: 300px;
    height: 250px;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.mobile} {
    width: 185px;
    height: 144px;
    margin: 0 auto;
  }
`;
