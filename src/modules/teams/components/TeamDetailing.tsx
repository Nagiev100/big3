import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, remove } from "../../../api/baseFetch";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import { fetchTeam } from "../../../core/redux/reducer/teamThunk";
import { AddTextLogo } from "../../../common/components/shared/AddTextLogo";
import Create from "../../../assests/icons/create.png";
import Delete from "../../../assests/icons/delete.png";
import { TableTeamDetail } from "./tableTeamDetail";
import { CustomNavLink } from "./addTeam";

export interface ITeamsResponse {
  pageSize: number;
  page: number;
  count: number;
  data: IPlayer[];
}

export interface IPlayer {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}

export const TeamDetailing: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teamDetail = useAppSelector((state) => state.team.currentTeam);
  const [playersInTeam, setPlayersInTeam] = useState<IPlayer[] | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchDetailing = async () => {
      try {
        dispatch(fetchTeam({ id: id! }));
      } catch {}
    };
    if (id) {
      fetchDetailing();
    }
  }, []);

  const deleteTeam = async () => {
    const token = localStorage.getItem("token");
    if (!playersInTeam?.length) {
      const response = await remove(`Team/Delete?id=${id}`, token!);
      if (response) {
        navigate("/layout/teamsCard");
      }
    } else {
    }
  };
  const upDateTeam = () => {
    navigate("/layout/addTeam?edit=1");
  };

  useEffect(() => {
    const fetchPlayerInTeam = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await get(`Player/GetPlayers?TeamIds=${id}`, token!);
        setPlayersInTeam(response.data);
      } catch {}
    };
    if (id) {
      fetchPlayerInTeam();
    }
  }, [id]);

  return (
    <ContainerDetail>
      {teamDetail && (
        <ContainerDitailTeam>
          <ContainerNameTeam>
            <BreadCrumbLink to={"/layout/teamsCard"}>
              <ContainerLogo>
                <AddTextLogo beforePaddingLeft="34px">
                  Team {teamDetail.name}
                </AddTextLogo>
              </ContainerLogo>
            </BreadCrumbLink>
            <ContainerImg>
              <Img src={Create} onClick={upDateTeam} />
              <Img src={Delete} onClick={deleteTeam} />
            </ContainerImg>
          </ContainerNameTeam>
          <ContainerGridAddTeam>
            <ImgTeamDitail
              src={"http://dev.trainee.dex-it.ru" + teamDetail.imageUrl}
            />
            <TeamDetails>
              <TextWrapper>
                <Name>{teamDetail.name}</Name>
                <ItemContainer>
                  <LabelTeam>Year of foundation</LabelTeam>
                  <InformationTeam>{teamDetail.foundationYear}</InformationTeam>
                </ItemContainer>
                <ItemContainer>
                  <LabelTeam>Conference</LabelTeam>
                  <InformationTeam>{teamDetail.conference}</InformationTeam>
                </ItemContainer>
              </TextWrapper>
              <ContainerDivision>
                <ItemContainer>
                  <LabelTeam>Division</LabelTeam>
                  <InformationTeam>{teamDetail.division}</InformationTeam>
                </ItemContainer>
              </ContainerDivision>
            </TeamDetails>
          </ContainerGridAddTeam>
        </ContainerDitailTeam>
      )}
      {!!playersInTeam && (
        //todo add margin
        <div>
          <TableTeamDetail playersInTeam={playersInTeam} />
        </div>
      )}
    </ContainerDetail>
  );
};
const ContainerDetail = styled.div`
  max-width: 1140px;
  height: 525px;
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
const ContainerDitailTeam = styled.div`
  width: 100%;
  background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
  @media ${(props) => props.theme.tablet} {
    padding-bottom: 24px;
    height: fit-content;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
  }
`;
const ContainerNameTeam = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1140px;
  flex-wrap: nowrap;
  height: 69px;
  max-width: 100vw;
  background-color: #fff;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: 48px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 48px;
  }
`;

const BreadCrumbLink = styled(CustomNavLink)`
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
`;

const ContainerLogo = styled.div`
  display: flex;
  flex-shrink: 1;
  height: 100%;
  //margin-left: 32px;
  @media ${(props) => props.theme.tablet} {
    margin-left: 16px;
  }
  @media ${(props) => props.theme.mobile} {
    margin-left: 16px;
  }
`;
const ContainerGridAddTeam = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  max-width: 1140px;
  padding-bottom: 50px;
  @media ${(props) => props.theme.laptop} {
    padding-bottom: 80px;
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 0;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 0;
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
const ImgTeamDitail = styled.img`
  width: 210px;
  height: 210px;
  margin-left: 146px;
  margin-top: 97px;
  @media ${(props) => props.theme.laptop} {
    margin-left: 40px;
    margin-top: 40px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 89px;
    height: 90px;
    margin-top: 48px;
    margin-left: auto;
    margin-right: auto;
  }
  @media ${(props) => props.theme.mobile} {
    width: 89px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 48px;
  }
`;

const ContainerImg = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  margin-right: 32px;
  margin-top: 23px;
  padding-bottom: 20px;
  align-items: center;
  @media ${(props) => props.theme.tablet} {
    margin-top: 30px;
    justify-content: flex-end;
  }
  @media ${(props) => props.theme.mobile} {
    margin-top: 30px;
    justify-content: flex-end;
  }
`;

export const Name = styled.h1`
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 36px;
  max-width: 400px;
  text-align: center;
  font-weight: 800;
  line-height: normal;
  color: #ffffff;
  margin-top: 65px;

  @media ${(props) => props.theme.laptop} {
    font-size: 28px;
  }

  @media ${(props) => props.theme.tablet} {
    text-align: center;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    max-width: 340px;
    margin-top: 0;
  }
  @media ${(props) => props.theme.mobile} {
    //margin-left: 160px;
    margin-top: 0;
    font-size: 17px;
    max-width: 250px;
    font-weight: 800;
    line-height: 25px;
    //align-items: center;
  }
`;
const TeamDetails = styled.div`
  display: grid;
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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: baseline;
  @media ${(props) => props.theme.laptop} {
    align-items: baseline;
  }
  @media ${(props) => props.theme.tablet} {
    align-items: center;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
  }
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
const LabelTeam = styled.p`
  height: 33px;
  padding-top: 40px;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #fff;
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
const InformationTeam = styled.p`
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
    padding-top: 30px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 15px;
    width: auto;
    height: fit-content;
    font-weight: 500;
    line-height: 24px;
    padding-top: 30px;
  }
`;
const ContainerDivision = styled.div`
  margin-top: 115px;
  @media ${(props) => props.theme.tablet} {
    margin: 0;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0;
  }
`;
