import styled from "styled-components";
interface ImageComponent {
    widthProps?:string,
    heightProps?:string,
    background?:string,
    borderRadius?:string,


    maxWidth?:string,
    maxHeight?:string
}

export const Image = styled.img<ImageComponent>`
  max-width: ${props => props.maxWidth};
  max-height:  ${props => props.maxHeight};
  background-color: ${props => props.background};
  border-radius:  ${props => props.borderRadius};
  width: ${props => props.widthProps} ;
  height: ${props => props.heightProps};
`