import styled from "styled-components";

interface IAddTextLogo{
    beforePaddingLeft : string
}

export const AddTextLogo = styled.p <IAddTextLogo>`
  height: 100%;
  width: 100%;
  position: relative;
  color:#E4163A;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-left: 32px;
  padding-top: 24px;
  &:before{
    content: '/';
    position: absolute;
    padding-left: ${props => props.beforePaddingLeft};
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #9C9C9C;
  }
`