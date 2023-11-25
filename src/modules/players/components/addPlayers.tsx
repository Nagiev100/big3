import {FC, useEffect, useState} from "react";
import Select from 'react-select'
import {useForm} from "react-hook-form";
import ClickedImg from "../../../assests/images/cllickerPhoto.svg";
import {get} from "../../../api/baseFetch";
import {Container} from "../../../common/components/shared/CenterImage";
import styled from "styled-components";
import {ContainerGrid} from "../../../common/components/shared/GridComponent";
import {Image} from "../../../common/components/shared/ImageCompanent";
import {Input} from "../../../common/components/shared/InputComponent";
import {AddTextLogo} from "../../../common/components/shared/AddTextLogo";
import {ITypeTeam} from "../../../core/redux/reducer/teamSlice";


interface addPlayersFromData {
    name: string,
    number: number,
    position: string,
    team: number,
    birthday: string,
    height: number,
    weight: number,
    avatarUrl: string
}

interface IOptions {
    value: string,
    label: string
}

export const AddPlayer: FC = () => {
    const [positions, setPositions] = useState<string[]>([])
    const [position, setPosition] = useState<string>('')
    const [teams, setTeams] = useState<IOptions[]>([])
    console.log("teams", teams)
    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
        reset,
    } = useForm<addPlayersFromData>({
        mode: "onBlur",
    });

    useEffect(() => {
        const fetchDetailing = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await get(`Player/GetPositions`, token!)

                setPositions(response)
            } catch {
                console.log('error')
            }
        }
        fetchDetailing()
    }, [])

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


    const onSubmit = async (propData: addPlayersFromData) => {
        const resultBody = {
            ...propData,
            position: position,
        }
    }

    const colourStyles = {
        control: (base: {}) => ({
            ...base,
            boxShadow: "none",
            height: '40px',
            background: '#F6F6F6',
            border: 'none'
        }),
        option: (styles: any, {data, isDisabled, isFocused, isSelected}: any) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#C60E2E" : null,
                color: isFocused ? "#ffffff" : null,

            };
        },
    };


    const optionsPosition: IOptions[] = positions.map(p => ({
        value: p,
        label: p
    }))


    return (
        <>
            <Container heightProps='655px' backgroundProps='#FFFFFF' marginLeft='80px'
                       marginTop='32px'>
                <Container heightProps='69px' backgroundProps='#FFFFFF'>
                    <AddTextLogo beforePaddingLeft='45px'>Players Add new player</AddTextLogo>
                </Container>
                <ContainerGrid gridTemplateColumn='3fr 4fr'>
                    <Container marginLeft='73px' marginTop='48px'>
                        <Container widthProps='336px' display={"flex"} justifyContent={"center"} heightProps='261px'
                                   backgroundProps='#9C9C9C'>
                            <Image src={ClickedImg}
                                   widthProps='74px'
                                   heightProps='75px'
                                   maxWidth='100%'
                                   maxHeight='100%'
                                   borderRadius='10px'/>
                        </Container>
                    </Container>
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor='name'>Name</label>
                            <Input
                                borderColor={errors?.name ? 'red' : '#F6F6F6'}
                                widthProps='366px'
                                heightProps='40px'
                                id='name'
                                {...register('name', {required: true})}
                            />
                            <Container widthProps={"366px"}>

                                <label htmlFor='position'>Position</label>
                                <Select
                                    id='position'
                                    options={optionsPosition}
                                    onChange={data => setPosition(data?.value || "")}
                                    styles={colourStyles}
                                />
                            </Container>
                            <Container widthProps={"366px"}>
                                <label htmlFor='team'>Team</label>
                                <Select
                                    id='team'
                                    options={teams}
                                    styles={colourStyles}
                                />
                            </Container>
                            <Container widthProps={"366px"}>
                                <ContainerGrid gridTemplateColumn='1fr 1fr' gap={"12px"}>
                                    <Container>
                                        <label htmlFor='height'>Height (cm)</label>
                                        <Input
                                            borderColor={errors?.height ? '#FF768E' : '#F6F6F6'}
                                            id='height'
                                            {...register('height', {required: true})}
                                        />
                                    </Container>
                                    <Container>

                                        <label>Birthday</label>
                                        <Input
                                            borderColor={errors?.weight ? "#FF768E" : '#F6F6F6'}
                                        />
                                    </Container>
                                    <Container>
                                        <label htmlFor='weight'>Weight (kg)</label>
                                        <Input
                                            borderColor={errors?.weight ? "#FF768E" : '#F6F6F6'}
                                            id='weight'
                                            {...register('weight', {required: true})}
                                        />
                                    </Container>
                                    <Container>

                                        <label htmlFor='number'>Number</label>
                                        <Input
                                            borderColor={errors?.number ? '#FF768E' : '#F6F6F6'}
                                            id='number'
                                            {...register('number', {required: true})}
                                        />
                                    </Container>
                                </ContainerGrid>
                            </Container>

                        </Form>
                    </Container>
                </ContainerGrid>

            </Container>
        </>
    )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
