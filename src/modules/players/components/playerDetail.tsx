import {FC, useEffect,} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { remove} from "../../../api/baseFetch";
import {useAppDispatch, useAppSelector} from "../../../core/redux/store";
import Create from "../../../assests/icons/create.png";
import Delete from "../../../assests/icons/delete.png";
import styled from "styled-components";
import {fetchPlayer} from "../../../core/redux/reducer/player/playerThunk";

interface IPlayerDetail {
    name: string,
    number: number,
    position: string,
    team: number,
    birthday: string,
    height: number,
    weight: number,
    avatarUrl: string,
    id: number,
    teamName: string
}
export const PlayerDetail : FC = () =>{
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const playerDetail = useAppSelector(state => state.player.currentPlayer)
    const {id} = useParams()
    useEffect(  ()=>{
        const fetchDetailing = async () => {
            try {
                dispatch(fetchPlayer({id:id!}))

            } catch {
                console.log('error')
            }
        }
        if (id){
            fetchDetailing()
        }
    },[])

    const deleteTeam = async () => {
        const token = localStorage.getItem('token')
        const response = await remove(`Team/Delete?id=${id}`,  token!)
        if (response){
            navigate('/layout/teamsCard')
        }
    }
    const upDateTeam = () => {
        navigate('/layout/addTeam?edit=1')
    }

    return(
        <div>
            {
                playerDetail &&
                <ContainerTeamDetail>
                    <WrapperText>
                        <WrapText>
                            <TextTeams>Teams</TextTeams>
                            <Span>/</Span>
                            <TextTeams>{playerDetail.name}</TextTeams>
                        </WrapText>
                        <WrapLink>
                            <Img src={Create} onClick={upDateTeam}/>
                            <Img src={Delete} onClick={deleteTeam}/>
                        </WrapLink>
                    </WrapperText>

                    <WrapperInformation>
                        <LogoTeam src={'http://dev.trainee.dex-it.ru' + playerDetail.imageUrl}/>
                        <div>
                            <TeamName>{playerDetail.name}</TeamName>
                            <TeamDetails>
                                <li>
                                    <LabelTeam>Year of foundation</LabelTeam>
                                    <InformationTeam>{playerDetail.foundationYear}</InformationTeam>
                                </li>
                                <li>
                                    <LabelTeam>Conference</LabelTeam>
                                    <InformationTeam>{playerDetail.conference}</InformationTeam>
                                </li>
                                <ContainerDivision>
                                    <li>
                                        <LabelDivision>Division</LabelDivision>
                                        <InformationTeam>{playerDetail.conference}</InformationTeam>
                                    </li>
                                </ContainerDivision>

                            </TeamDetails>
                        </div>
                    </WrapperInformation>
                </ContainerTeamDetail>
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
const WrapperText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1140px;  
  height: 69px;
  background-color: #FFF;
`
const WrapText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 32px;
`
const TextTeams =styled.p`
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #E4163A;
`
const Span = styled.span`
 color: #9C9C9C;
`
const WrapLink = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 32px;
  margin-top: 24px;
`
const Img =styled.img`
  width:24px;
  height: 24px;
  margin-right: 16px;
`

const WrapperInformation = styled.div`
  display:grid;
  grid-template-columns: 3fr 4fr;
`
const LogoTeam = styled.img`
  width: 210px;
  height: 210px;
  margin-left: 146px;
  margin-top: 97px;

`
const TeamName = styled.h1`
  font-family: Avenir;
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
const LabelTeam =styled.p`
  font-family: Avenir;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
  margin-top: 40px;
`
const LabelDivision = styled.p`
  font-family: Avenir;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
`
const InformationTeam = styled.p`
  font-family: Avenir;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #FFF;
  margin-top: 8px;
`
const ContainerDivision = styled.div`
 margin-top: 54px;
`