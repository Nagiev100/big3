import styled from "styled-components";
import {Container} from "./CenterImage";
import {Image} from './ImageCompanent'

interface ICard{
    contentName:string,
    contentYear:number,
    imageUrl:string
}

export const Card = ({ imageUrl,contentName,contentYear}:ICard ) => {
    return (

            <ContainerCard>
                <ImageContainer>
                    <Image src={imageUrl} widthProps='150px' heightProps='150px' margin='65px 107px'  />
                </ImageContainer>
                <CardContent>
                    <p>{contentName}</p>
                    <Text>Year of foundation:{contentYear}</Text>
                </CardContent>
            </ContainerCard>


    );
};
const ContainerCard =styled.div`
    width:364px;
    height:380px;
    background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
    display:flex ;
    flex-direction:column ;
    justify-content:flex-end;
`
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CardContent = styled.div`
  max-width: 364px;
  height: 100px;
  background-color: #303030;
  width: 364px;
  color: #fff;
  align-self: flex-end;
  text-align: center;
  padding: 24px 0;
`
const Text = styled.p`
 color: #9C9C9C;   
 font-size: 14px;
 font-style: normal;
 font-weight: 500;
 line-height: 24px;
`
