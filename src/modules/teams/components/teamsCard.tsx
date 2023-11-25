import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchTeams} from "../../../core/redux/reducer/teamThunk";
import { useAppDispatch, useAppSelector} from "../../../core/redux/store";
import TeamsCardImg from '../../../assests/images/TeamsCardImg.png'
import SearchImg from '../../../assests/icons/search_rounded.svg'
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {CenterImage} from "../../../common/components/shared/CenterImage";
import {Container} from "../../../common/components/shared/CenterImage";
import {Card} from "../../../common/components/shared/CardCompanent";
import {ContainerGrid} from "../../../common/components/shared/GridComponent";
import {Button} from "../../../common/components/shared/ButtonCompanent";
import {Input} from "../../../common/components/shared/InputComponent";




interface IOptions {
    value:number,
    label:number
}




export const TeamsCard : FC = () => {
    const dispatch = useAppDispatch()
    const selector = useAppSelector((store) => store.team);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6);
    const [name, setName] = useState("")
    useEffect(()=>{
        dispatch(fetchTeams({page,pageSize, name}));
    },[page,pageSize, name])
    console.log(name)

    const updatePageSize = (params: any) => {
        setPageSize(params.value)
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




    return<div style={{width:'1140px', margin:'0 auto'}} >
        <Container display='flex' flexDirection='row' justifyContent='space-between'  >
            <ContainerSearch>
                <Input
                    widthProps='364px'
                    heightProps='40px'
                    type='search'
                    placeholder='Search...'
                    onChange={(val)=>setName(val.target.value)}
                />
                <ImgSearch src={SearchImg}/>
            </ContainerSearch>
            <Link to='/layout/addTeam'>
            <Button>
               <ButtonText>Add </ButtonText>
                +
            </Button>
            </Link>
        </Container>
        {
        <ContainerGrid gridTemplateColumn='repeat(3,1fr)' gap='24px'>
        {
           selector?.data?.count !== 0  ? selector.data?.data.map((data, id) =>
                    <Link to={`${data.id}`} >
                        <Card
                            contentName={data.name}
                            contentYear={data.foundationYear}
                            imageUrl={'http://dev.trainee.dex-it.ru' + data.imageUrl}
                        />
                    </Link>
               ) :
               <CenterImage imageUrl={TeamsCardImg}/>
        }
        </ContainerGrid>}


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

           <Select
            options={options}
            onChange={updatePageSize}
           />
        </SectionPaginate>
    </div>;
};



const ContainerSearch = styled.div`
  position: relative;
  width: 364px;
  height: 40px;
  margin: 32px 0;
`
const ImgSearch = styled.img`
  position: absolute;
  content: '';
  width: 16px;
  height: 16px;
  color: Grey;
  top: 12px;
  right: 12px;
`
export const ButtonText =styled.span`
  margin-right: 8px;
  
`

const SectionPaginate = styled.section`
  display: flex;
  flex-direction: row;
`
