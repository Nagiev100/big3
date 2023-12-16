import styled from "styled-components";

interface IButton {
  padding?: string;
  width?: string;
  marginLeft?: string;
  marginTop?: string;
  backgroundColor?: string;
  backgroundHover?: string;
  backgroundActive?: string;
  border?: string;
  color?: string;
}

export const Button = styled.button<IButton>`
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  height: 40px;
  border: ${(props) => props.border};
  border-radius: 4px;
  margin-top: ${(props) => props.marginTop};
  margin-left: /*40px;*/ ${(props) => props.marginLeft};
  &:hover {
    background-color: /*#FF5761*/ ${(props) => props.backgroundHover};
  }
  &:active {
    background-color: /*#C60E2E*/ ${(props) => props.backgroundActive};
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-right: 0;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin-right: 0;
  }
`;
