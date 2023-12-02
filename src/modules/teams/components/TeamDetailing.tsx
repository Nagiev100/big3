import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, remove } from "../../../api/baseFetch";
import styled from "styled-components";
import Create from "../../../assests/icons/create.png";
import Delete from "../../../assests/icons/delete.png";
import { TableTeamDetail } from "./tableTeamDetail";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import { fetchTeam } from "../../../core/redux/reducer/teamThunk";
import { handleNotifyError } from "../../../common/components/shared/toastifyService";
import { AddTextLogo } from "../../../common/components/shared/AddTextLogo";

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
      } catch {
        console.log("error");
      }
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
      handleNotifyError(
        "Ошибка! Нельзя удалить команду у которой есть игроки",
      )();
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
        console.log(response);
        setPlayersInTeam(response.data);
      } catch {
        console.log("error");
      }
    };
    if (id) {
      fetchPlayerInTeam();
    }
  }, [id]);

  return (
    <div>
      {teamDetail && (
        <ContainerTeamDetail>
          <ContainerFunctional>
            <ContainerLogo>
              <AddTextLogo beforePaddingLeft="40px">
                Teams {teamDetail.name}
              </AddTextLogo>
            </ContainerLogo>
            <ContainerButton>
              <Img src={Create} onClick={upDateTeam} />
              <Img src={Delete} onClick={deleteTeam} />
            </ContainerButton>
          </ContainerFunctional>

          <ContainerInformation>
            <ImgTeam
              src={"http://dev.trainee.dex-it.ru" + teamDetail.imageUrl}
            />
            <ContainerData>
              <Name>{teamDetail.name}</Name>
              <TeamDetails>
                <li>
                  <Text>Year of foundation</Text>
                  <TextConference>{teamDetail.foundationYear}</TextConference>
                </li>
                <li>
                  <Text>Conference</Text>
                  <TextConference>{teamDetail.conference}</TextConference>
                </li>
                <ContainerDivision>
                  <li>
                    <LabelDivision>Division</LabelDivision>
                    <TextConference>{teamDetail.conference}</TextConference>
                  </li>
                </ContainerDivision>
              </TeamDetails>
            </ContainerData>
          </ContainerInformation>
        </ContainerTeamDetail>
      )}
      {!!playersInTeam && (
        <div>
          <TableTeamDetail playersInTeam={playersInTeam} />
        </div>
      )}
    </div>
  );
};
const ContainerData = styled.div`
  @media ${(props) => props.theme.mobile} {
    margin-left: 110px;
    width: 100%;
  }
`;
const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  margin-top: 30px;
`;
const ImgTeam = styled.img`
  width: 210px;
  height: 210px;
  margin-left: 146px;
  margin-top: 97px;
  @media ${(props) => props.theme.mobile} {
    width: 89px;
    height: 90px;
    margin-top: 48px;
  }
`;
const ContainerTeamDetail = styled.div`
  width: 1140px;
  height: 473px;
  background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
  margin-left: 80px;
  margin-top: 32px;
  @media ${(props) => props.theme.mobile} {
    max-width: 480px;
    margin-left: 0;
    height: 542px;
    width: 480px;
  }
`;
const ContainerFunctional = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1140px;
  height: 69px;
  background-color: #fff;
  @media ${(props) => props.theme.mobile} {
    margin-left: 0;
    height: 48px;
  }
`;
const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-left: 32px;
  @media ${(props) => props.theme.mobile} {
    margin-right: 0;
  }
`;
const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 32px;
`;
const ContainerInformation = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
`;

export const Name = styled.h1`
  font-size: 36px;
  font-weight: 800;
  line-height: normal;
  color: #ffffff;
  margin-top: 65px;
  @media ${(props) => props.theme.mobile} {
    margin-left: 160px;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
    margin-top: 0;
  }
`;
const TeamDetails = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
  }
`;
const Text = styled.p`
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #fff;
  margin-top: 40px;
  @media ${(props) => props.theme.mobile} {
    width: 135px;
    height: 25px;
    font-size: 17px;
    font-weight: 800;
    margin-top: 48px;
    margin-left: 60px;
  }
`;

const LabelDivision = styled.p`
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #fff;
`;
const TextConference = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #fff;
  margin-top: 8px;

  @media ${(props) => props.theme.mobile} {
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    margin-top: 32px;
  }
`;
const ContainerDivision = styled.div`
  margin-top: 54px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
  }
`;
