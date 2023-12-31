import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { remove } from "../../../api/baseFetch";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import Create from "../../../assests/icons/create.png";
import Delete from "../../../assests/icons/delete.png";
import styled from "styled-components";
import { fetchPlayer } from "../../../core/redux/reducer/player/playerThunk";
import { Container } from "../../../common/components/shared/CenterImage";
import { AddTextLogo } from "../../../common/components/shared/AddTextLogo";
import { Name } from "../../teams/components/TeamDetailing";
import { CustomNavLink } from "../../teams/components/addTeam";

export const PlayerDetail: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const playerDetail = useAppSelector((state) => state.player.currentPlayer);
  const { id } = useParams();

  const getAge = (birthdateProps: string) => {
    const birthdate = new Date(birthdateProps);
    const year = birthdate?.getFullYear();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (year) {
      let age = currentYear - year;
      return age;
    }
  };
  useEffect(() => {
    const fetchDetailing = async () => {
      try {
        dispatch(fetchPlayer({ id: id! }));
      } catch {
        console.log("error");
      }
    };
    if (id) {
      fetchDetailing();
    }
  }, []);

  const deletePlayer = async () => {
    const token = localStorage.getItem("token");
    const response = await remove(`Player/Delete?id=${id}`, token!);
    if (response) {
      navigate("/layout/playersCard");
    }
  };
  const upDatePlayer = () => {
    navigate("/layout/addPlayer?edit=1");
  };

  return (
    <ContainerDetail>
      {playerDetail && (
        <ContainerDitailPlayer>
          <ContainerNamePlayer>
            <BreadCrumbLink to={"/layout/playersCard"}>
              <ContainerLogo>
                <AddTextLogo beforePaddingLeft="45px">
                  Players {playerDetail.name}
                </AddTextLogo>
              </ContainerLogo>
            </BreadCrumbLink>
            <ContainerImg>
              <Img src={Create} onClick={upDatePlayer} />
              <Img src={Delete} onClick={deletePlayer} />
            </ContainerImg>
          </ContainerNamePlayer>
          <ContainerGridAddPlayer>
            <ImgPlayer
              src={"http://dev.trainee.dex-it.ru" + playerDetail.avatarUrl}
            />
            <TextWrapper>
              <ContainerNumber>
                <Name>{playerDetail.name}</Name>
                <Number>#{playerDetail.number}</Number>
              </ContainerNumber>
              <PlayerDetails>
                <InfoSection widthProps={"100%"}>
                  <ItemContainer>
                    <LabelPlayer>Position</LabelPlayer>
                    <InformationPlayer>
                      {playerDetail.position}
                    </InformationPlayer>
                  </ItemContainer>
                  <ItemContainer>
                    <LabelPlayer>Height</LabelPlayer>
                    <InformationPlayer>{playerDetail.height}</InformationPlayer>
                  </ItemContainer>
                  <ItemContainer>
                    <LabelPlayer>Age</LabelPlayer>
                    <InformationPlayer>
                      {getAge(playerDetail.birthday)}
                    </InformationPlayer>
                  </ItemContainer>
                </InfoSection>
                <Container widthProps={"100%"}>
                  <ItemContainer>
                    <LabelPlayer>Team</LabelPlayer>
                    <InformationPlayer>
                      {playerDetail.teamName}
                    </InformationPlayer>
                  </ItemContainer>
                  <ItemContainer>
                    <LabelPlayer>Weight</LabelPlayer>
                    <InformationPlayer>{playerDetail.weight}</InformationPlayer>
                  </ItemContainer>
                </Container>
              </PlayerDetails>
            </TextWrapper>
          </ContainerGridAddPlayer>
        </ContainerDitailPlayer>
      )}
    </ContainerDetail>
  );
};

const InfoSection = styled(Container)`
  @media ${(props) => props.theme.tablet} {
    order: 2;
  }
  @media ${(props) => props.theme.mobile} {
    order: 2;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemContainer = styled.div`
  @media ${(props) => props.theme.tablet} {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const ContainerDetail = styled.div`
  max-width: 1140px;
  height: 525px;
  background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 32px;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
`;

const BreadCrumbLink = styled(CustomNavLink)`
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
`;
const ContainerDitailPlayer = styled.div`
  width: 100%;
  @media ${(props) => props.theme.tablet} {
    padding-bottom: 24px;
    margin: 0 auto;
    height: fit-content;
  }
  @media ${(props) => props.theme.mobile} {
    padding-bottom: 24px;
    margin: 0 auto;
    height: fit-content;
  }
`;
const ContainerNamePlayer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1140px;
  width: 100%;

  max-width: 100vw;
  height: 69px;
  background-color: #fff;
  @media ${(props) => props.theme.tablet} {
    height: 48px;
  }
  @media ${(props) => props.theme.mobile} {
    //width: 100%;
    height: 48px;
  }
`;
const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  //margin-left: 32px;
  @media ${(props) => props.theme.tablet} {
    //margin-left: 16px;
  }
  @media ${(props) => props.theme.mobile} {
    //margin-left: 16px;
  }
`;
const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 32px;
  @media ${(props) => props.theme.tablet} {
    //width: 100%;
    padding-top: 16px;
    margin: 0;
    justify-content: flex-end;
  }
  @media ${(props) => props.theme.mobile} {
    //width: 100%;
    padding-top: 16px;
    margin: 0;
    justify-content: flex-end;
  }
`;
const ContainerNumber = styled.div`
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  margin-right: auto;
  overflow: hidden;
  @media ${(props) => props.theme.laptop} {
    max-width: 300px;
  }
  @media ${(props) => props.theme.tablet} {
    margin: 0 auto;
    width: 100%;
    max-width: 380px;
    justify-content: center;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    width: 100%;
    max-width: 380px;
    justify-content: center;
  }
`;
const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  @media ${(props) => props.theme.tablet} {
    margin: 0;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0;
    margin-right: 10px;
  }
`;
const ImgPlayer = styled.img`
  width: 450px;
  height: 450px;
  @media ${(props) => props.theme.laptop} {
    width: 350px;
    height: 350px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 143px;
    height: 112px;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.mobile} {
    width: 143px;
    height: 112px;
    margin: 0 auto;
  }
`;

const ContainerGridAddPlayer = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  max-width: 1140px;
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
  }
`;

const Number = styled.p`
  color: #ff5761;
  font-size: 36px;
  //flex-grow: 1;
  font-weight: 800;
  padding-top: 65px;
  padding-left: 10px;
  @media ${(props) => props.theme.tablet} {
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    padding-top: 0;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    padding-top: 0;
  }
`;

const PlayerDetails = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
  }
`;
const LabelPlayer = styled.p`
  width: 92px;
  height: 33px;
  padding-top: 40px;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #fff;
  @media ${(props) => props.theme.laptop} {
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: fit-content;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    text-align: center;
    padding-top: 24px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: fit-content;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    text-align: center;
    padding-top: 24px;
  }
`;
const InformationPlayer = styled.p`
  width: 69px;
  height: 25px;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #ffffff;
  padding-top: 38px;
  @media ${(props) => props.theme.tablet} {
    font-size: 15px;
    width: auto;
    height: fit-content;
    font-weight: 500;
    line-height: 24px;
    padding-top: 12px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 15px;
    width: auto;
    height: fit-content;
    font-weight: 500;
    line-height: 24px;
    padding-top: 12px;
  }
  // @media ${(props) => props.theme.mobile} {
  //   font-size: 15px;
  //   width: auto;
  //   height: fit-content;
  //   font-weight: 500;
  //   line-height: 24px;
  //   padding-top: 12px;
  // }
`;
