import styled from "styled-components";
import {Image} from "./ImageCompanent";

export interface IImageUrl {
    imageUrl:string
}
interface ContainerProps {
    widthProps?: string,
    backgroundProps?:string | [string,string],
    heightProps?:string,
    flexDirection?:string,
    justifyContent?:string,
    marginLeft?:string,
    marginTop?:string,
    marginRight?:string,
    display?:string,
    gridTemplateColumn?:string,
    gridTemplateRows?:string,
    margin?:string,
}

export const CenterImage = ({imageUrl}:IImageUrl) => {
    return (
        <Container widthProps='1300px' backgroundProps='#F6F6F6' justifyContent='center' display='flex'>
            <Container widthProps='556px' backgroundProps='#FFF' heightProps='570px' flexDirection='column' justifyContent='center' display='flex'>
                <Image src={imageUrl} background='#FFF' borderRadius='15px' maxWidth='100%' maxHeight='100%'/>
                <ImageText>Empty here</ImageText>
                <p>Add new teams to continue</p>
            </Container>
        </Container>
    )
}

export const Container = styled.div<ContainerProps>`
  display: ${props => props.display};
  flex-direction:${props => props.flexDirection};
  justify-content:${props => props.justifyContent};
  align-items: center;
  width:${props => props.widthProps};
  background-color:${props => props.backgroundProps};
  height: ${props => props.heightProps} ;
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  margin-top:${props => props.marginTop};
  margin: ${props => props.margin};
  grid-template-columns: ${props => props.gridTemplateColumn};
  grid-template-rows:${props => props.gridTemplateRows} ;
`
export const ImageText = styled.h2`
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  color: #FF768E;
`