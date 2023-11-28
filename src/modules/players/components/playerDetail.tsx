import {FC, useEffect,} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { remove} from "../../../api/baseFetch";
import {useAppDispatch, useAppSelector} from "../../../core/redux/store";
import Create from "../../../assests/icons/create.png";
import Delete from "../../../assests/icons/delete.png";
import styled from "styled-components";
import {fetchPlayer} from "../../../core/redux/reducer/player/playerThunk";
import {Container} from "../../../common/components/shared/CenterImage";
import {AddTextLogo} from "../../../common/components/shared/AddTextLogo";
import {Image} from "../../../common/components/shared/ImageCompanent";
import { ContainerGrid } from "common/components/shared/GridComponent";
import {Name} from "../../teams/components/TeamDetailing";
import {create} from "domain";


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

    const deletePlayer = async () => {
        const token = localStorage.getItem('token')
        const response = await remove(`Player/Delete?id=${id}`,  token!)
        if (response){
            navigate('/layout/playersCard')
        }
    }
    const upDatePlayer = () => {
        navigate('/layout/addPlayer?edit=1')
    }

    return(
        <div>
            {
                playerDetail &&
                <ContainerTeamDetail>
                    <Container display='flex' flexDirection='row' justifyContent='space-between' widthProps='1140px' heightProps='69px' backgroundProps='#FFF' >
                        <Container display='flex' flexDirection='row' widthProps='100%' heightProps='100%' marginLeft='32px'>
                            <AddTextLogo beforePaddingLeft='45px'>Players {playerDetail.name}</AddTextLogo>
                        </Container>
                        <Container display='flex' flexDirection='row' marginRight='32px'>
                            <Image widthProps='24px' heightProps='24px' marginRight='16px' src={Create} onClick={upDatePlayer}/>
                            <Image widthProps='24px' heightProps='24px' marginRight='16px' src={Delete} onClick={deletePlayer}/>
                        </Container>
                    </Container>

                    <ContainerGrid gridTemplateColumn='3fr 4fr' >
                        <Image src={'http://dev.trainee.dex-it.ru' + playerDetail.avatarUrl} widthProps='450px' heightProps='450px'/>
                        <div>
                            <Container display='flex' flexDirection='row' >
                                <Name>{playerDetail.name}</Name>
                                <Number>#{playerDetail.number}</Number>
                            </Container>

                            <TeamDetails>
                                <Container>
                                    <li>
                                        <LabelPlayer>Position</LabelPlayer>
                                        <InformationPlayer>{playerDetail.position}</InformationPlayer>
                                    </li>

                                    <li>
                                        <LabelPlayer>Height</LabelPlayer>
                                        <InformationPlayer>{playerDetail.height}</InformationPlayer>
                                    </li>
                                    <li>
                                        <LabelPlayer>Age</LabelPlayer>
                                        <InformationPlayer>{playerDetail.birthday}</InformationPlayer>
                                    </li>
                                </Container>
                                <Container>
                                    <li>
                                        <LabelPlayer>Team</LabelPlayer>
                                        <InformationPlayer>{playerDetail.teamName}</InformationPlayer>
                                    </li>
                                    <li>
                                        <LabelPlayer>Weight</LabelPlayer>
                                        <InformationPlayer>{playerDetail.weight}</InformationPlayer>
                                    </li>
                                </Container>

                            </TeamDetails>
                        </div>
                    </ContainerGrid>
                </ContainerTeamDetail>
            }


        </div>
    )
}
const ContainerTeamDetail = styled.div`
  width: 1140px;
  height: 525px;
  background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
  margin-left: 80px;
  margin-top: 32px;
`

const Number = styled.p`
  color: #FF5761;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  padding-top: 65px;
  padding-left: 10px;
`

const TeamDetails = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
`
const LabelPlayer =styled.p`
  width: 92px;
  height: 33px;
  padding-top: 40px;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
  
`
const LabelDivision = styled.p`
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
`
const InformationPlayer = styled.p`
  width: 69px;
  height: 25px;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #FFFFFF;
  padding-top: 38px;
`
