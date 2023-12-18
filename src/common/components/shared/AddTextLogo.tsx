import styled from "styled-components";

interface IAddTextLogo {
  beforePaddingLeft: string;
}

export const AddTextLogo = styled.p<IAddTextLogo>`
  height: 100%;
  width: 100%;
  position: relative;
  color: #e4163a;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-left: 32px;
  padding-top: 24px;
  &:before {
    content: "/";
    position: absolute;
    padding-left: ${(props) => props.beforePaddingLeft};
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #9c9c9c;
  }
  @media ${(props) => props.theme.tablet} {
    padding-top: 16px;
    padding-left: 0px;
  }
  @media ${(props) => props.theme.mobile} {
    padding-top: 16px;
    padding-left: 0px;
  }
`;
