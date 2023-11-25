import styled from "styled-components";
interface IButton {

    width?:string
}

export const Button = styled.button<IButton>`
  padding: 8px 24px;
  background-color:#E4163A;
  width:${props => props.width};
  color: white;
  height: 40px;
  border: none;
  border-radius: 4px;
  margin-left: 40px;
  &:hover{
    background-color: #FF5761;
  }
  &:active{
    background-color: #C60E2E;
  }
`