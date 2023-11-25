import styled from "styled-components";



interface FormComponent {
    widthProps?:string,
    heightProps?:string,
    marginTop?:string,
    marginLeft?:string,

}

export const Form = styled.img<FormComponent>`
  max-height: 100%;
  margin-top:${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  width: ${props => props.widthProps} ;
  height: ${props => props.heightProps};
`