import {FC, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import ClickedImg from '../../../assests/images/cllickerPhoto.svg'
import {post, put} from "../../../api/baseFetch";
import {useNavigate,  useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {getAddPlayerErrorAlert} from "../../players/helpers/getAddPlayerErrorAlert";
import {useAppSelector} from "../../../core/redux/store";

interface addTeamFormData{
    name: string,
    foundationYear : number,
    division: string,
    conference: string,
    imageUrl: string;
}

export const AddTeam: FC = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const isEdit = params.get('edit')
    const filePicker = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const teamData = useAppSelector(state => state.team.currentTeam)
    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        reset,
    } = useForm<addTeamFormData>({
        mode: "onBlur",
        defaultValues: isEdit?{
            name:teamData.name,
            foundationYear:teamData.foundationYear,
            division: teamData.division,
            conference:teamData.conference,
        }: undefined
    });
    const goBack = () => {
        navigate(-1)
    }

    const onSubmit = async (propData:addTeamFormData) => {
        const image = filePicker.current?.files;
        const selectedImage = image?.[0] as Blob;
        const data = {...propData, imageUrl: image}
        try {
           const token = localStorage.getItem('token')
           const formData = new FormData();
           formData.append('file', selectedImage,image?.[0]?.name)
           const imagePath =  await fetch ("http://dev.trainee.dex-it.ru/api/Image/SaveImage", {
               method: 'POST',
               headers: {
                   Authorization: "Bearer " + token,
               },
               body: formData
           })

            const resultString = await imagePath?.json()
            if (resultString){
               // @ts-ignore
                data.imageUrl = resultString
                setPreviewImage('http://dev.trainee.dex-it.ru' + resultString)
                let response;
                if (isEdit){
                    response = await put('Team/Update',JSON.stringify({...data,id:teamData.id}),`${token}`)
                }else {
                    response = await post('Team/Add',JSON.stringify(data),`${token}`)
                }
               if (response){
                   reset()
                   navigate('/layout/teamsCard')
               }
           }
       }catch (e: any){
            const notify = () => toast(getAddPlayerErrorAlert(e?.status), {type: "error",bodyStyle: {color: "green"} });
            notify();
       }
    }

    const handlePick = () =>{
        if(filePicker.current !== null){
            filePicker.current.click()
        }
    }

    return(
        <>
            <Container>
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
            </Container>

        </>
    )
}
const Container = styled.div`
  width: 1140px;
  height:565px;
  background-color: #FFF;
  border-radius: 10px;
  margin-top: 32px;
  margin-left: 80px;
`
const WrapText = styled.div`
  width:1140px;
  height: 69px;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  height: 496px;
`
const ContainerImg = styled.div<{backGroundColor?:string}>`
  width: 336px;
  height: 261px;
  border-radius: 10px;
  background-color:${props => `${props.backGroundColor || '#9C9C9C'}`};
`
const SectionImg = styled.section`
  height: 100%;
  margin-left: 73px;
  margin-top: 48px;
`
const ImgClicked = styled.img`
  width: 74px;   
  height: 75px;
  margin-left:131px;
  margin-top: 85px;
`
const SectionForm = styled.section`
  width: 100%;
  height: 100%;
`
const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin-top:18px;
  margin-left: 136px;
`
const Label = styled.label`
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #707070;
`
const Input = styled.input<{borderColor?:string}>`
  width: 366px;
  height: 40px;
  border: ${props => `1px solid ${props.borderColor || '#707070'}`};
  border-radius: 4px;
  background-color: #F6F6F6;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #707070;
  padding-left: 12px;
  &:default{
    background-color: #F6F6F6;
  }
  &:hover{
    background-color: #D1D1D1;
  }
  &:focus{
    background-color: #F6F6F6;
  }
`
const TextErrors = styled.p`
  width: 256px;
  height: 24px;
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #FF768E;
`
const ButtonContainer = styled.div`
  display: flex;
`
const ButtonCancel = styled.button`
  display: flex;
  width: 171px;
  height: 40px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--ui-light-grey, #9C9C9C);
  &:hover{
    background-color: #D1D1D1;
    color: #9C9C9C;
  }
  &:active{
    background-color: #707070;
    color: #9C9C9C;
  }
`
const TextButtonCancel = styled.p`
  font-family: Avenir;
  color: #9C9C9C;
  width: 47px;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
`
const ButtonSave = styled.button`
  display: flex;
  width: 171px;
  height: 40px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background: var(--ui-red, #E4163A);
  &:hover{
    background-color: #FF5761;
  }
  &:active{
    background-color: #C60E2E;
  }
  &:disabled{
    background-color: #D1D1D1;
    color: #F6F6F6;
  }
`
const TextButtonSave = styled.p`
  font-family: Avenir;
  color: #FFFFFF;
  width: 47px;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
`
const LabelText = styled.p`
  width: 100%;
  height: 100%;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #E4163A;
  padding-left: 32px;
  padding-top: 24px;
`
const Span = styled.span`
  color: #9C9C9C;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`
