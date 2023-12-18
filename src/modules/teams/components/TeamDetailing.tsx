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
            <ContainerLogo>
              <AddTextLogo beforePaddingLeft="34px">
                Team {teamDetail.name}
              </AddTextLogo>
            </ContainerLogo>
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
              <div>
                <Name>{teamDetail.name}</Name>
                <ItemContainer>
                  <LabelTeam>Year of foundation</LabelTeam>
                  <InformationTeam>{teamDetail.foundationYear}</InformationTeam>
                </ItemContainer>
                <ItemContainer>
                  <LabelTeam>Conference</LabelTeam>
                  <InformationTeam>{teamDetail.conference}</InformationTeam>
                </ItemContainer>
              </div>
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
        <div>
          <TableTeamDetail playersInTeam={playersInTeam} />
        </div>
      )}
    </ContainerDetail>
  );
};
const ContainerDetail = styled.div`
  width: 1140px;
  height: 525px;
  margin-left: 80px;
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
    height: 100%;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    margin: 0 auto;
  }
`;
const ContainerNameTeam = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1140px;
  height: 69px;
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
const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-left: 32px;
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
  @media ${(props) => props.theme.tablet} {
    width: 89px;
    height: 90px;
    margin-top: 48px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 89px;
    height: 90px;
    margin-top: 48px;
  }
`;

const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 32px;
  margin-top: 23px;
  padding-bottom: 20px;
  align-items: center;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin-top: 30px;
    justify-content: flex-end;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 30px;
    justify-content: flex-end;
  }
`;

export const Name = styled.h1`
  font-size: 36px;
  font-weight: 800;
  line-height: normal;
  color: #ffffff;
  margin-top: 65px;

  @media ${(props) => props.theme.tablet} {
    margin-left: 300px;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    margin-top: 0;
  }
  @media ${(props) => props.theme.mobile} {
    margin-left: 160px;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    margin-top: 0;
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
