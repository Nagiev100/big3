import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {get, remove} from "../../../api/baseFetch";
import styled from "styled-components";
import Create from '../../../assests/icons/create.png'
import Delete from '../../../assests/icons/delete.png'
import {TableTeamDetail} from "./tableTeamDetail";
import {useAppDispatch, useAppSelector} from "../../../core/redux/store";
import {fetchTeam} from "../../../core/redux/reducer/teamThunk";
import {toast} from "react-toastify";
import {getAddPlayerErrorAlert} from "../../players/helpers/getAddPlayerErrorAlert";
import {handleNotifyError} from "../../../common/components/shared/toastifyService";
import {Container} from "../../../common/components/shared/CenterImage";
import {AddTextLogo} from "../../../common/components/shared/AddTextLogo";
import {Image} from "../../../common/components/shared/ImageCompanent";




export interface ITeamsResponse {
    pageSize: number;
    page: number;
    count: number;
    data: IPlayer[];
}

export interface IPlayer {
    name: string,
    number: number,
    position: string,
    team: number,
    birthday: string,
    height: number,
    weight: number,
    avatarUrl: string,
    "id": number
}

export const TeamDetailing: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const teamDetail = useAppSelector(state => state.team.currentTeam)
    const [playersInTeam, setPlayersInTeam] = useState<IPlayer[] | null>(null)
    const {id} = useParams()
    useEffect(() => {
        const fetchDetailing = async () => {
            try {
                dispatch(fetchTeam({id: id!}))

            } catch {
                console.log('error')
            }
        }
        if (id) {
            fetchDetailing()
        }
    }, [])

    const deleteTeam = async () => {
        const token = localStorage.getItem('token')
        if (!playersInTeam?.length) {
            const response = await remove(`Team/Delete?id=${id}`, token!)
            if (response) {
                navigate('/layout/teamsCard')
            }
        }else{
            handleNotifyError("Ошибка! Нельзя удалить команду у которой есть игроки")()
        }

    }
    const upDateTeam = () => {
        navigate('/layout/addTeam?edit=1')
    }

    useEffect(() => {
        const fetchPlayerInTeam = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await get(`Player/GetPlayers?TeamIds=${id}`, token!)
                console.log(response)
                setPlayersInTeam(response.data)

            } catch {
                console.log('error')
            }
        }
        if (id) {
            fetchPlayerInTeam()
        }
    }, [id])


    return (
        <div>
            {teamDetail &&
                <ContainerTeamDetail>
                    <Container display='flex' flexDirection='row' justifyContent='space-between' widthProps='1140px' heightProps='69px' backgroundProps='#FFF' >
                        <Container display='flex' flexDirection='row' widthProps='100%' heightProps='100%' marginLeft='32px'>
                            <AddTextLogo beforePaddingLeft='40px'>Teams {teamDetail.name}</AddTextLogo>

                        </Container>
                        <Container display='flex' flexDirection='row' marginRight='32px'>
                            <Image widthProps='24px' heightProps='24px' marginRight='16px' src={Create} onClick={upDateTeam}/>
                            <Image widthProps='24px' heightProps='24px' marginRight='16px' src={Delete} onClick={deleteTeam}/>
                        </Container>
                    </Container>
                    <ContainerInformation>
                        <Image widthProps='210px' heightProps='210px' marginLeft='146px' marginTop='97px' src={'http://dev.trainee.dex-it.ru' + teamDetail.imageUrl}/>
                        <div>
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
                        </div>
                    </ContainerInformation>
                </ContainerTeamDetail>
            }
            {!!playersInTeam &&
                <div>
                    <TableTeamDetail playersInTeam={playersInTeam}/>
                </div>
            }


        </div>
    )
}
const ContainerTeamDetail = styled.div`
  width: 1140px;
  height: 473px;
  background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
  margin-left: 80px;
  margin-top: 32px;
`
const ContainerInformation = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
`

export const Name = styled.h1`
  font-size: 36px;
  font-weight: 800;
  line-height: normal;
  color: #FFFFFF;
  margin-top: 65px;
`
const TeamDetails = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
`
const Text = styled.p`
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
  margin-top: 40px;
`
const LabelDivision = styled.p`
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
`
const TextConference = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #FFF;
  margin-top: 8px;
`
const ContainerDivision = styled.div`
  margin-top: 54px;
`

