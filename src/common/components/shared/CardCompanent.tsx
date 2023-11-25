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

            <Container widthProps='364px' heightProps='380px' backgroundProps='#707070' display='flex' flexDirection='column' >
              {/* <Container display='flex' justifyContent='center'>*/}
                   <Image src={imageUrl} widthProps='150px' heightProps='150px'   />
{/*
               </Container>
*/}
                <CardContent>
                    <p>{contentName}</p>
                    <p>Year of foundation:{contentYear}</p>
                </CardContent>
            </Container>


    );
};


export const CardContent = styled.div`
  max-width: 364px;
  height: 100px;
  background-color: #303030;
  
`
