import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../core/redux/store";
import {Link} from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import {fetchPlayers} from "../../../core/redux/reducer/player/playerThunk";
import PlayersCardImg from "../../../assests/icons/CardPlayersImg.png";
import SearchImg from "../../../assests/icons/search_rounded.svg";
import Select, {CSSObjectWithLabel} from "react-select";
import {get} from "../../../api/baseFetch";
import {ITypeTeam} from "../../../core/redux/reducer/teamSlice";
import {CenterImage, Container} from "../../../common/components/shared/CenterImage";
import {Input} from "../../../common/components/shared/InputComponent";
import {Button} from "../../../common/components/shared/ButtonCompanent";
import {
  ButtonText,
  ContainerSearch,
  ImgSearch,
  PaginateContainer,
  SectionPaginate
} from "../../teams/components/teamsCard";
import NextIcon from "../../../assests/icons/chevron_right_24px.png";
import PrevIcon from "../../../assests/icons/chevron_left_24px (1).png";
import {ContainerGrid} from "../../../common/components/shared/GridComponent";
import {Card} from "../../../common/components/shared/CardCompanent";

interface IOptions {
  value:number,
  label:number
}


export const PlayersCard: FC = () => {
  const dispatch = useAppDispatch()
  const selector = useAppSelector((store) => store.player);
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(6);
  const [name, setName] = useState("")
  const [teams, setTeams] = useState<IOptions[]>([])
  const [selectedTeams,setSelectedTeams] = useState<IOptions[]>([])





  useEffect(()=>{
    const selectedTeamString = selectedTeams.reduce((acc , carrentValue) => acc + `&teamIds=${carrentValue.value}`,'')
    dispatch(fetchPlayers({page,pageSize, name,teams:selectedTeamString}));
  },[page,pageSize, name,selectedTeams])
  const updatePageSize = (params: any) => {
    setPageSize(params.target)
  }
  const options: IOptions[]= [
    {
      value:6,
      label:6
    },
    {
      value:12,
      label:12
    },
    {
      value:24,
      label:24
    }

  ]


  useEffect(() => {
    const getTeam = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await get('Team/GetTeams', token!!)
        setTeams(response.data.map((team: ITypeTeam) => ({
          value: team.id,
          label: team.name
        })))
      } catch {
        console.log('error')
      }
    }
    getTeam()
  }, [])

  const colourStyles = {
    control: (base: {}) => ({
      ...base,
      boxShadow: "none",
      background: '#FFF',
      border: 'solid 1px #D1D1D1',
      marginTop:'30px'
    }),
    option: (styles: any, {data, isDisabled, isFocused, isSelected}: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#C60E2E" : null,
        color: isFocused ? "#ffffff" : null,

      };
    },
  };
  const colourStylesMulti = {
    control: (base: {}) => ({
      ...base,
      boxShadow: "none",
      height: '40px',
      background: '#FFF',
      border: 'solid 1px #D1D1D1',
      marginTop:'16px',
    }),
    option: (styles: any, {data, isDisabled, isFocused, isSelected}: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#C60E2E" : null,
        color: isFocused ? "#ffffff" : null,
        width:'364px',
        multiValue:{
          backgroundColor:'red'
        }

      };
    },
  };


  return <ContainerPlayersCard>
    <WrapperSearch >
      <ContainerSearch>
        <InputSearch
            type='search'
            placeholder='Search...'
            onChange={(val)=>setName(val.target.value)}
        />
        <ImgSearch src={SearchImg}/>
      </ContainerSearch>

      <ContainerSelect>
        <Select
            options={teams}
            value={selectedTeams}
            isMulti={true}
            onChange={(t)=> setSelectedTeams(t as any)}
            styles={colourStylesMulti}
        />
      </ContainerSelect>

      <Link to='/layout/addPlayer'>
        <ButtonPlayerCard>
          <ButtonText>Add </ButtonText>
          +
        </ButtonPlayerCard>
      </Link>
    </WrapperSearch>
    {
      <ContainerGrid gridTemplateColumn='repeat(3,1fr)' gap='24px'>
        {
          selector?.data?.count !== 0  ? selector.data?.data.map((data, id) =>
                  <Link to={`${data.id}`} >
                    <Card
                        contentName={data.name}
                        contentYear={data.team}
                        imageUrl={'http://dev.trainee.dex-it.ru' + data.avatarUrl}
                    />
                  </Link>
              ) :
              <CenterImage imageUrl={PlayersCardImg}/>
        }
      </ContainerGrid>}
    <SectionPaginate>
      {
          selector.data?.count && (
              <PaginateContainer>
                <ReactPaginate
                    breakLabel={'...'}
                    nextLabel={<img src={NextIcon} width='19px' height='19px' />}
                    previousLabel={<img src={PrevIcon} width='19px' height='19px'/>}
                    onPageChange={({selected})=>{setPage(selected +1)}}
                    initialPage={page}
                    pageRangeDisplayed={pageSize}
                    pageCount={Math.ceil(selector.data.count/ pageSize)}
                    previousAriaLabel={'<'}
                    renderOnZeroPageCount={null}
                    activeClassName={'active'}
                />
              </PaginateContainer>
          )
      }

      <Select
          options={options}
          onChange={updatePageSize}
          styles={colourStyles}
      />
    </SectionPaginate>
  </ContainerPlayersCard>;
};
const ContainerPlayersCard =styled.div`
  width:1140px;
  margin: 0 auto;
  @media ${props => props.theme.mobile}{
    margin:0 auto;
    width: 100%;
    padding: 0 24px
  }
`
const WrapperSearch = styled.div`
  display:flex; 
  flex-direction:row;
  justify-content:space-between;
  @media ${props => props.theme.mobile}{
    width:100%;
    flex-direction:column;
    margin: 0 auto;
  }
`
const InputSearch = styled.input`
  border-color:#D1D1D1;
  width:364px;
  height:40px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding-left: 12px;
  border-radius: 4px;
  @media ${props => props.theme.mobile}{
    width: 100%;
    margin-left: 0;
    margin-top:16px;
  }
  `
const ButtonPlayerCard =styled.button`
  padding:8px 24px;
  width: 104px;
  border:none;
  background-color:#E4163A;
  color:#FFF;
  margin-left:40px;
  margin-top: 32px;
  height: 40px;
  border-radius: 4px;
  &:hover{
    background-color: #FF5761;
  }
  &:active{
    background-color: #C60E2E;
  }
  @media ${props => props.theme.mobile}{
    width: 100%;
    margin-left:0;
    margin-top:16px;
    height: auto
  }
`
const ContainerSelect = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin: 15px 0 ;
  @media ${props => props.theme.mobile} {
    width: 100%;
    margin:0;
    height: auto;

  }
\`

`




