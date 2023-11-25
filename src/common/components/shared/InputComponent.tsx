import styled from "styled-components";

interface InputComponent{
    widthProps?:string,
    heightProps?:string,
    borderColor?:string,
    background?:string,
    padding?:string
}

export const Input = styled.input<InputComponent>`
  width: ${props => props.widthProps || "100%"};
  height: ${props => props.heightProps};
  padding: ${props => props.padding};
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  border-radius: 4px;
  background-color: /*#F6F6F6*/ ${props => props.background};
  border: ${props => `1px solid ${props.borderColor || '#707070'}`};
  &:hover{
    background-color: #D1D1D1;
  }
  &:focus{
    background-color: #F6F6F6;
  }
`