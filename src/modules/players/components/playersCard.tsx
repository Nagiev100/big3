import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../core/redux/store";
import {Link} from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import {fetchPlayers} from "../../../core/redux/reducer/player/playerThunk";
import TeamsCardImg from "../../../assests/images/TeamsCardImg.png";
import SearchImg from "../../../assests/icons/search_rounded.svg";

export const PlayersCard: FC = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(6);
  const [name, setName] = useState("")
  const selector = useAppSelector((store) => store.player);
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchPlayers({page,pageSize, name}));
  },[page,pageSize, name])
  const updatePageSize = (params: any) => {
    setPageSize(params.target.value)
  }

  return <div>
    <ContainerSearch>
      <WrapSearch>
        <InputSearch
            type='search'
            placeholder='Search...'
            onChange={(val)=>setName(val.target.value)}
        />
        <ImgSearch src={SearchImg}/>
      </WrapSearch>
      <ButtonAdd><Link to='/layout/addPlayer'><TextButton>Add +</TextButton></Link></ButtonAdd>
    </ContainerSearch>
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridAutoRows: "auto", gridRowGap: "10px"}}>
      {
        selector ? selector.data?.data.map((data,index) =>
                <ContainerTeam key={index} >
                  <Container>
                    <Teams>
                      <ContainerImg>
                        <Img src={'http://dev.trainee.dex-it.ru' + data.avatarUrl}/>
                      </ContainerImg>
                      <ContainerInformation>
                        <p>{data.name}</p>
                      </ContainerInformation>
                    </Teams>
                  </Container>
                </ContainerTeam>)
             :
            <div>
              <img src={TeamsCardImg}/>
              <h2>Empty here</h2>
              <p>Add new teams to continue</p>
            </div>

      }
    </div>
    <SectionPaginate>
      {
          selector.data?.count && (
              <ReactPaginate
                  breakLabel={'...'}
                  nextLabel='>'
                  previousLabel={'<'}
                  onPageChange={({selected})=>{setPage(selected +1)}}
                  initialPage={page}
                  pageRangeDisplayed={pageSize}
                  pageCount={Math.ceil(selector.data.count/ pageSize)}
                  previousAriaLabel={'<'}
                  renderOnZeroPageCount={null}
              />
          )
      }
      <InputPageSize name="pageSize" list="cities" onChange={updatePageSize}/>
      <datalist id="cities">
        <option value='6' />
        <option value="12" />
        <option value="24" />
      </datalist>
    </SectionPaginate>
  </div>;
};

const ContainerSearch = styled.div`
  display: flex;
  height: 110px;
  width: 100%;
`
const WrapSearch = styled.div`
  width:100%;
  height: 100%;
  justify-content: space-between;
  position: relative;
`
const InputSearch = styled.input`
  width: 364px;
  height: 40px;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  padding-left: 12px;
  margin-left: 80px;
  margin-top: 32px;
`
const ImgSearch = styled.img`
  position: absolute;
  content: '';
  width: 16px;
  height: 16px;
  color: Grey;
  top: 45px;
  left: 420px;
`
const ButtonAdd = styled.button`
  display: flex;
  width: 104px;
  height: 40px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  background:#E4163A;
  margin-right: 80px;
  margin-top: 32px;
`
const TextButton = styled.p`
  font-family: Avenir;
  color: #FFF;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
`
const ContainerTeam =styled.div`
  height: 100%;
  width: 100%;
  display: grid;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr ;
  
`
const Teams = styled.div`
  width: 364px;
  height: 380px;
  display: flex;
  flex-direction: column;
`
const ContainerImg = styled.div`
  position: relative;
  width: 364px;
  height: 280px;
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
`
const Img = styled.img`
    position: absolute;
    content: '';
    width: 150px;
    height: 150px;
`
const ContainerInformation = styled.div`
  width: 364px;
  height: 180px;
  background: #303030;
`
const SectionPaginate = styled.section`
  display: flex;
  flex-direction: row;
`
const InputPageSize = styled.input`
  width: 88px;
  height: 40px;`




