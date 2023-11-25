/*
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
    console.log(selector.data?.count)



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
            <ButtonAdd><Link to='/layout/addTeam'><TextButton>Add +</TextButton></Link></ButtonAdd>
        </ContainerSearch>

        {
            <div style={{display: "grid", gridTemplateColumns:"1fr 1fr 1fr", }}>
                {
                    selector?.data?.count !== 0  ? selector.data?.data.map((data, id) =>
                            <Link to={`${data.id}`} >
                                <ContainerTeam>
                                    <Container>
                                        <Teams>
                                            <ContainerImg>
                                                <Img src={'http://dev.trainee.dex-it.ru' + data.imageUrl}/>
                                            </ContainerImg>
                                            <ContainerInformation>
                                                <p>{data.name}</p>
                                                <p>{data.foundationYear}</p>
                                            </ContainerInformation>
                                        </Teams>
                                    </Container>
                                </ContainerTeam>
                            </Link>

                        ) :

                        <CenterImage imageUrl={TeamsCardImg}/>
                }
            </div>}
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
  display: grid;
  gridTemplateColumns: 1fr 1fr 1fr;
  gridAutoRows: auto;
  gridRowGap: 10px;
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
*/

import ClickedImg from "../../assests/images/cllickerPhoto.svg";

export const Trening = () => {
    return(
        <div>
           {/* <Container>
                <WrapText>
                    <LabelText>
                        Teams
                        <Span>/</Span>
                        Add new team
                    </LabelText>
                </WrapText>
                <Wrapper>
                    <SectionImg>
                        <ContainerImg onClick={handlePick} backGroundColor={previewImage?previewImage:'#9C9C9C'} >
                            <ImgClicked src={ClickedImg}  />
                        </ContainerImg>
                    </SectionImg>
                    <SectionForm>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Label htmlFor='name'>Name</Label>
                            <Input borderColor={errors?.name?'red': '#F6F6F6' }
                                   id='name'
                                   {...register('name',{required:true})}
                            />
                            <div>
                                {errors?.name && <TextErrors>{errors?.name.message || "Required"}</TextErrors>}
                            </div>
                            <Label htmlFor='division'>Division</Label>
                            <Input borderColor={errors?.division?'red': '#F6F6F6' }
                                   id='division'
                                   {...register('division',{required:true})}
                            />
                            <div>
                                {errors?.division && <TextErrors>{errors?.division.message || "Required"}</TextErrors>}
                            </div>
                            <Label>Conference</Label>
                            <Input borderColor={errors?.conference?'red': '#F6F6F6' }
                                   id="conference"
                                   {...register('conference',{required:true})}
                            />
                            <div>
                                {errors?.conference && <TextErrors>{errors?.conference.message || "Required"}</TextErrors>}
                            </div>
                            <Label>Year of foundation</Label>
                            <Input borderColor={errors?.foundationYear?'red': '#F6F6F6' }
                                   id='foundationYear'
                                   {...register('foundationYear',{required:true})}
                            />
                            <div>
                                {errors?.foundationYear&& <TextErrors>{errors?.foundationYear.message || "Required"}</TextErrors>}
                            </div>

                            <input
                                type='file'
                                {...register('imageUrl')}
                                ref={  filePicker }
                            />
                            <ButtonContainer>
                                <ButtonCancel onClick={goBack} >
                                    <TextButtonCancel>Cancel</TextButtonCancel>
                                </ButtonCancel>
                                <ButtonSave
                                    type='submit' disabled={!isValid}
                                    onClick={handleSubmit(onSubmit)}>
                                    <TextButtonSave>Save</TextButtonSave>
                                </ButtonSave>
                            </ButtonContainer>
                        </Form>
                    </SectionForm>
                </Wrapper>
            </Container>*/}

        </div>
    )
}
