import {FC, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import ClickedImg from '../../../assests/images/cllickerPhoto.svg'
import {post, put} from "../../../api/baseFetch";
import {useNavigate,  useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {getAddPlayerErrorAlert} from "../../players/helpers/getAddPlayerErrorAlert";
import {useAppSelector} from "../../../core/redux/store";
import {Container} from "../../../common/components/shared/CenterImage";
import {AddTextLogo} from "../../../common/components/shared/AddTextLogo";
import {ContainerGrid} from "../../../common/components/shared/GridComponent";
import {Image} from "../../../common/components/shared/ImageCompanent";
import {ContainerClickedImg} from "../../../common/components/shared/ContainerClickedImg";
import {Input} from "../../../common/components/shared/InputComponent";
import {Form, Label} from "../../ authorization/signIn";
import {Button} from "../../../common/components/shared/ButtonCompanent";


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
        formState: {errors, isValid},
        reset,
    } = useForm<addTeamFormData>({
        mode: "onBlur",
        defaultValues: isEdit ? {
            name: teamData.name,
            foundationYear: teamData.foundationYear,
            division: teamData.division,
            conference: teamData.conference,
        } : undefined
    });
    const goBack = () => {
        navigate(-1)
    }

    const addImg = async () =>{
        const image = filePicker.current?.files;
        const selectedImage = image?.[0] as Blob;
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('file', selectedImage, image?.[0]?.name)
        const imagePath = await fetch("http://dev.trainee.dex-it.ru/api/Image/SaveImage", {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData
        })
        const resultString = await imagePath?.json()
        setPreviewImage(resultString)

    }

    const onSubmit = async (propData: addTeamFormData) => {
        const token = localStorage.getItem('token')
        const data = {...propData, imageUrl:  previewImage}

        try {
            if (previewImage) {
                // @ts-ignore
                data.imageUrl = previewImage
                let response;
                if (isEdit) {
                    response = await put('Team/Update', JSON.stringify({...data, id: teamData.id}), `${token}`)
                } else {
                    response = await post('Team/Add', JSON.stringify(data), `${token}`)
                }
                if (response) {
                    reset()
                    navigate('/layout/teamsCard')
                }
            }
        } catch (e: any) {
            const notify = () => toast(getAddPlayerErrorAlert(e?.status), {type: "error", bodyStyle: {color: "green"}});
            notify();
        }
    }

    const handlePick = () => {
        if (filePicker.current !== null) {
            filePicker.current.click()
        }
    }

    return (
        <>
            <ContainerAddTeam>
                <Container heightProps='69px' backgroundProps='#FFFFFF' widthProps={'100%'}>
                    <AddTextLogo beforePaddingLeft='40px'>Teams Add new team</AddTextLogo>
                </Container>
                <ContainerAddTeamGrid >
                    <ContainerClickedImg
                        marginTop='48px'
                        marginLeft='73px'
                        onClick={handlePick}
                        background='#9C9C9C'
                        backgroundImage={previewImage?`url("http://dev.trainee.dex-it.ru${previewImage}")`:undefined}
                    >
                        <Image src={ClickedImg}
                               widthProps='74px'
                               heightProps='75px'
                        />
                    </ContainerClickedImg>
                    <ContainerInputAddTeam>
                        <Form>
                            <Label>Name</Label>
                            <Input
                                borderColor={errors?.name ? 'red' : '#F6F6F6'}
                                background='#F6F6F6'
                                widthProps='366px'
                                heightProps='40px'
                                {...register('name', {required: true})}
                            />
                            <Label>Division</Label>
                            <Input
                                borderColor={errors?.division ? 'red' : '#F6F6F6'}
                                background='#F6F6F6'
                                widthProps='366px'
                                heightProps='40px'
                                {...register('division', {required: true})}
                            />
                            <Label>Conference</Label>
                            <Input
                                borderColor={errors?.conference ? 'red' : '#F6F6F6'}
                                background='#F6F6F6'
                                widthProps='366px'
                                heightProps='40px'
                                {...register('conference', {required: true})}
                            />
                            <Label>Year of foundation</Label>
                            <Input
                                borderColor={errors?.foundationYear ? 'red' : '#F6F6F6'}
                                background='#F6F6F6'
                                widthProps='366px'
                                heightProps='40px'
                                {...register('foundationYear', {required: true})}
                            />
                        </Form>
                    </ContainerInputAddTeam>
                </ContainerAddTeamGrid>
                <Container display='flex' flexDirection='row' marginTop='26px' marginLeft='625px'>
                    <ButtonCansel
                        onClick={goBack}
                    >
                        <span>Cancel</span>
                    </ButtonCansel>
                    <ButtonSave
                        onClick={handleSubmit(onSubmit)}
                        type='submit'
                        disabled={!isValid}
                    >
                        <span>Save</span>
                    </ButtonSave>

                </Container>
                <InputFile
                    type='file'
                    ref={filePicker}
                    onInputCapture={addImg}
                />

            </ContainerAddTeam>
        </>
    )
}
export const ButtonCansel = styled.button`
  width:171px;
  height: 40px;
  background-color:#FFFFFF;
  border:1px solid #9C9C9C;
  color:#9C9C9C;
  &:hover{
    background-color: #9C9C9C
  }
  &:active{
    background-color:#707070
  }
  @media ${props => props.theme.mobile}{
    width:100%;
    margin-top:26px
  }
`
export const ButtonSave = styled.button`
  width:171px;
  height: 40px;
  border:1px solid #9C9C9C;
  color:#fff;
  margin-left: 24px;
  background-color: #E4163A;
  &:hover{
    background-color: #FF5761
  }
  &:active{
    background-color:#C60E2E
  }
  @media ${props => props.theme.mobile}{
    width:100%;
    
    margin-top:26px
  }
`
const ContainerAddTeam = styled.div`
  width:1140px;
  height:545px;
  background-color:#FFFFFF;
  margin-Left:80px;
  margin-Top:32px;
  @media ${props => props.theme.mobile}{
    margin: 0 auto;
    width:100%;
    padding: 0 24px;
    height:100%
  }
`
const ContainerAddTeamGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  @media ${props => props.theme.mobile}{
    grid-template-columns: 1fr;
  }
`
const ContainerInputAddTeam = styled.div`
   margin-left: 136px;
  @media ${props => props.theme.mobile}{
    width:100%;
    margin:0 auto;
  }
  `
export const InputFile = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  line-height: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
`


