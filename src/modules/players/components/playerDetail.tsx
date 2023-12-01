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
import {containerCSS} from "react-select/dist/declarations/src/components/containers";


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
        <ContainerDitail>
            {
                playerDetail &&
                <ContainerDitailPlayer>
                    <ContainerNamePlayer >
                        <ContainerLogo>
                            <AddTextLogo beforePaddingLeft='45px'>Players {playerDetail.name}</AddTextLogo>
                        </ContainerLogo>
                        <ContainerImg>
                            <Img  src={Create} onClick={upDatePlayer}/>
                            <Img src={Delete} onClick={deletePlayer}/>
                        </ContainerImg>
                    </ContainerNamePlayer>

                    <ContainerGridAddPlayer >
                        <ImgPlayer src={'http://dev.trainee.dex-it.ru' + playerDetail.avatarUrl} />
                        <div>
                            <ContainerNumber >
                                <Name>{playerDetail.name}</Name>
                                <Number>#{playerDetail.number}</Number>
                            </ContainerNumber>
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
                    </ContainerGridAddPlayer>
                </ContainerDitailPlayer>
            }


        </ContainerDitail>
    )
}
const ContainerDitail = styled.div`
  width: 1140px;
  height: 525px;
  background: linear-gradient(276deg, #707070 0%, #393939 100.28%);
  margin-left: 80px;
  margin-top: 32px;
  @media ${props => props.theme.mobile} {
    width:100%;
    height:100%;
    margin:0 auto;
  }
`
const ContainerDitailPlayer = styled.div`
 width:100%;
  @media ${props => props.theme.mobile} {
    width:100%;
    height:100%;
    margin:0 auto;
  }
`
const ContainerNamePlayer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    width:1140px;
    height:69px;
    background-color:#FFF;
    @media ${props => props.theme.mobile} {
      width:100%;
      height:48px;
    }
`
const ContainerLogo = styled.div`
    display:flex;
    flex-direction:row;
    width:100% ;
    height:100%;
    margin-left:32px;
  @media ${props => props.theme.mobile} {
    margin-left:16px;
  } 
`
const ContainerImg = styled.div`
    display:flex;
    flex-direction:row;
  align-items: center;
    margin-right: 32px;
 
  @media ${props => props.theme.mobile} {
    width:100% ;
    padding-top:16px;
    margin:0;
    justify-content: flex-end;
    
  }
`
const ContainerNumber=styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
  @media ${props => props.theme.mobile} {
    margin: 0 auto;
    width:100%
  }
   
`
const Img = styled.img`
    width:24px;
    height:24px;
    margin-right:16px;
    @media ${props => props.theme.mobile} {
      margin:0;
      margin-right:10px;
    }
`
const ImgPlayer = styled.img`
  width: 450px;
  height: 450px;
  @media ${props => props.theme.mobile} {
    width:143px;
    height:112px;
    margin: 0 auto;
  }
  
`

const ContainerGridAddPlayer = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  max-width: 1140px;
 
  @media ${props => props.theme.mobile} {
    grid-template-columns: 1fr;
    width:100%;
    margin: 0 auto;
  }
`
const ContainerInformation = styled.div`
 
`


const Number = styled.p`
  color: #FF5761;
  font-size: 36px;
  font-weight: 800;
  padding-top: 65px;
  padding-left: 10px;
  @media ${props => props.theme.mobile} {
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
  }
`

const TeamDetails = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  @media ${props => props.theme.mobile} {
    grid-template-columns: 1fr;
    width:100%;
    margin: 0 auto;
  }
`
const LabelPlayer =styled.p`
  width: 92px;
  height: 33px;
  padding-top: 40px;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  color: #FFF;
  @media ${props => props.theme.mobile} {
    width: 100%;
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
  }
`
const InformationPlayer = styled.p`
  width: 69px;
  height: 25px;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #FFFFFF;
  padding-top: 38px;
  @media ${props => props.theme.mobile} {
    font-size: 15px;
    font-weight: 500;
    line-height: 24px;
  }
`
