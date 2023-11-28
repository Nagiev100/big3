import styled from "styled-components";

interface InputComponent{
    widthProps?:string,
    heightProps?:string,
    borderColor?:string,
    background?:string,
    padding?:string,
    marginTop?:string
}

export const Input = styled.input<InputComponent>`
  width: ${props => props.widthProps || "100%"};
  height: ${props => props.heightProps};
  padding: ${props => props.padding};
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding-left: 12px;
  border-radius: 4px;
  margin-top:${props => props.marginTop} ;
  
  background-color:  ${props => props.background};
  border: ${props => `1px solid ${props.borderColor || '#F6F6F6'}`};
  &:hover{
    background-color: #D1D1D1;
  }
  &:focus{
    background-color: #F6F6F6;
  }
`