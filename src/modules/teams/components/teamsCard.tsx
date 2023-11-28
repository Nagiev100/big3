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
import PrevIcon from '../../../assests/icons/chevron_left_24px (1).png'
import NextIcon from '../../../assests/icons/chevron_right_24px.png'




export interface IOptions {
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

    const colourStyles = {
        control: (base: {}) => ({
            ...base,
            boxShadow: "none",
            height: '40px',
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




    return<div style={{width:'1140px', margin:'0 auto'}} >
        <Container display='flex' flexDirection='row' justifyContent='space-between'  >
            <ContainerSearch>
                <Input
                    borderColor='#D1D1D1'
                    widthProps='364px'
                    heightProps='40px'
                    type='search'
                    placeholder='Search...'
                    onChange={(val)=>setName(val.target.value)}

                />
                <ImgSearch src={SearchImg}/>
            </ContainerSearch>
            <Link to='/layout/addTeam'>
            <Button
                padding='8px 24px'
                marginLeft='40px'
                border='none'
                backgroundColor='#E4163A'
                color='#FFF'
                backgroundHover='#FF5761'
                backgroundActive='#C60E2E'>
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
    </div>;
};



export const ContainerSearch = styled.div`
  position: relative;
  width: 364px;
  height: 40px;
  margin: 32px 0;
`
export const ImgSearch = styled.img`
  position: absolute;
  content: '';
  width: 16px;
  height: 16px;
  color: Grey;
  top: 12px;
  right: 12px;
`
export const ButtonText =styled.span`
  margin-right: 10px;
  
`
export const SectionPaginate = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
`
export const PaginateContainer =styled.div`
    ul{
      margin-top: 32px;
      list-style: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0;
    }
  li{
    margin: 0;
    padding: 0 8px;
    cursor: pointer;
  }
  li.active{
    a{
      background-color: #E4163A;
      color: white;
      border-radius: 4px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`
