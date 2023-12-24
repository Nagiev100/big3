import styled from "styled-components";
import { Image } from "./ImageCompanent";

interface ICard {
  contentName: string;
  contentYear: number;
  imageUrl: string;
}

export const Card = ({ imageUrl, contentName, contentYear }: ICard) => {
  return (
    <ContainerCard>
      <ImageContainer>
        <Image src={imageUrl} widthProps="150px" heightProps="150px" />
      </ImageContainer>
      <CardContent>
        <Title>{contentName}</Title>
        <Text>Year of foundation:{contentYear}</Text>
      </CardContent>
    </ContainerCard>
  );
};
const ContainerCard = styled.div`
  height: fit-content;
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media ${(props) => props.theme.tablet} {
    heigth: auto;
  }
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  background-color: #303030;
  color: #fff;
  align-self: flex-end;
  text-align: center;
  padding: 24px 24px;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: 94px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 94px;
  }
`;
const Text = styled.p`
  color: #9c9c9c;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const Title = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    max-width: calc((100vw - 60px) / 2);
  }
  @media ${(props) => props.theme.mobile} {
    max-width: calc((100vw - 60px) / 2);
  }
`;
