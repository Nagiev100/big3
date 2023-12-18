import styled from "styled-components";

export interface IImageUrl {
  imageUrl: string;
}
interface ContainerProps {
  widthProps?: string;
  backgroundProps?: string | [string, string];
  heightProps?: string;
  flexDirection?: string;
  justifyContent?: string;
  marginLeft?: string;
  marginTop?: string;
  marginRight?: string;
  display?: string;
  gridTemplateColumn?: string;
  gridTemplateRows?: string;
  margin?: string;
}

export const CenterImage = ({ imageUrl }: IImageUrl) => {
  return (
    <Container backgroundProps="#F6F6F6" justifyContent="center" display="flex">
      <Container
        widthProps="556px"
        backgroundProps="#FFF"
        heightProps="570px"
        flexDirection="column"
        justifyContent="center"
        display="flex"
      >
        <ImgDefaultTeamsCard src={imageUrl} />
        <ImageText>Empty here</ImageText>
        <p>Add new teams to continue</p>
      </Container>
    </Container>
  );
};

const ImgDefaultTeamsCard = styled.img`
  background: #fff;
  border-radius: 15px;
  max-width: 100%;
  max-height: 100%;
  @media ${(props) => props.theme.mobile} {
    width: 339px;
    height: 225px;
    margin-bottom: 48px;
  }
`;

export const Container = styled.div<ContainerProps>`
  display: ${(props) => props.display};
  flex-direction:${(props) => props.flexDirection};
  justify-content:${(props) => props.justifyContent};
  align-items: center;
  width:${(props) => props.widthProps};
  background-color:${(props) => props.backgroundProps};
  height: ${(props) => props.heightProps} ;
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top:${(props) => props.marginTop};
  margin: ${(props) => props.margin};
  grid-template-columns: ${(props) => props.gridTemplateColumn};
  grid-template-rows:${(props) => props.gridTemplateRows};
  @media ${(props) => props.theme.tablet}{
    padding:0px;
    margin:0 auto;
    heigth:667px;
    width:100%;
  }
  @media ${(props) => props.theme.mobile}{
    padding:0px;
    margin:0 auto;
    heigth:667px;
    width:100%;
  }

\`
  
  
  
  
`;
export const ImageText = styled.h2`
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  color: #ff768e;
`;
