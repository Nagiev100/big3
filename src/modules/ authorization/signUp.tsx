import React, {FC, useState} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {Link,useNavigate} from "react-router-dom";
import signUpImages from "../../assests/images/signUpImages.png"
import closeEye from "../../assests/icons/close_eye.svg"
import openEye from "../../assests/icons/eye_rounded.svg"
import {post} from "../../api/baseFetch";
import {Container} from "../../common/components/shared/CenterImage";
import {Image} from "../../common/components/shared/ImageCompanent";
import {
    AuthorizationText,
    ContainerIcon,
    ContainerInput,
    Form,
    Label,
    SloganAuthorization
} from "./signIn";
import {Input} from "../../common/components/shared/InputComponent";
import {Button} from "../../common/components/shared/ButtonCompanent";
import {
    handleAuthorizationSignInError,
    handleAuthorizationSignUpError
} from "../../common/components/shared/toastifyService";



interface SignUpFormData {
    userName: string;
    login: string;
    password: string;
    returnPassword?: string;
    checkBox?:true
}

export const SignUp: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        setError,
        reset,
    } = useForm<SignUpFormData>({
        mode: "onBlur",
    });

    const navigator = useNavigate()
    const [typePassword,setTypePassword] = useState('password')
    const [typeReturnPassword,setTypeReturnPassword]= useState('password')

    const onSubmit = async (data: SignUpFormData) => {
        const resultData = {userName:data.userName,login:data.login,password:data.password}

        if (data.password !== data.returnPassword) {
            setError("returnPassword", {
                type: "manual",
                message: "Пароли не совпадают",
            });
        }
        try {
            const response = await post("Auth/SignUp", JSON.stringify(resultData));
            if(response){
                localStorage.setItem('token', response.token)
            }
            navigator('/')

        }catch {
            if(data.password !== data.returnPassword){
                console.log('error')
            }else{
                handleAuthorizationSignUpError("Пользователь с таким логином уже существует")()
            }
        }
    }
    return (
        <>
            <Container widthProps='100vw' heightProps='100vh'>
                <Container display='grid' gridTemplateColumn='3fr 4fr'>
                    <Container backgroundProps='#FFFFFF' heightProps='100vh' display='flex' flexDirection='column' justifyContent='center'>
                        <SloganAuthorization>Sign Up</SloganAuthorization>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Label htmlFor='name'>Name</Label>
                            <Input borderColor={errors?.userName?'red': '#F6F6F6'}  widthProps='366px' heightProps='40px' id='name' background='#F6F6F6'
                                   {...register('userName', {required:true})}/>
                            <div>
                                {errors?.userName && (<ErrorsP>{errors?.userName.message || "Required"}</ErrorsP>)}
                            </div>
                            <Label htmlFor='login'>Login</Label>
                            <Input borderColor={errors?.login?'red': '#F6F6F6'} widthProps='366px' heightProps='40px' id='login' background='#F6F6F6'
                                   {...register('login', {required:true})}/>
                            <div>
                                {errors?.login && (<ErrorsP>{errors?.login.message || "Required"}</ErrorsP>)}
                            </div>
                            <ContainerInput>
                                <Label htmlFor='password'>Password</Label>
                                <Input borderColor={errors?.password?'red': '#F6F6F6'} widthProps='366px' heightProps='40px' id='password' background='#F6F6F6' type={typePassword}
                                       {...register('password', {required:true})}/>
                                {typePassword === 'password'?
                                    (<ContainerIcon onClick={() => setTypePassword('text')}><img src={closeEye}/></ContainerIcon>):
                                    (<ContainerIcon onClick={()=> setTypePassword('password')}><img src={openEye}/></ContainerIcon>)
                                }
                                <div>
                                    {errors?.password && (<ErrorsP>{errors?.password.message || "Required"}</ErrorsP>)}
                                </div>
                            </ContainerInput>
                            <ContainerInput>
                                <Label htmlFor='returnPassword'>Enter your password again</Label>
                                <Input borderColor={errors?.returnPassword?'red': '#F6F6F6'} widthProps='366px' heightProps='40px' id='returnPassword' background='#F6F6F6' type={typeReturnPassword}
                                       {...register('returnPassword', {required:true})}/>
                                {typeReturnPassword === 'password'?
                                    (<ContainerIcon onClick={() => setTypeReturnPassword('text')}><img src={closeEye}/></ContainerIcon>):
                                    (<ContainerIcon onClick={()=> setTypeReturnPassword('password')}><img src={openEye}/></ContainerIcon>)
                                }
                                <div>
                                    {errors?.returnPassword && (<ErrorsP>{errors?.returnPassword.message || "Required"}</ErrorsP>)}
                                </div>
                            </ContainerInput>
                            <ContainerCheckBox >
                                <Input
                                    borderColor={errors?.checkBox?'red': '#F6F6F6'}
                                widthProps='16px'
                                heightProps='16px'
                                type='checkbox'
                                {...register('checkBox',{required:true})}
                                />
                                <CheckBoxText>I accept the agreement</CheckBoxText>
                            </ContainerCheckBox>
                            <Container display='flex' flexDirection='column'>
                                <Button
                                    backgroundColor='#E4163A'
                                    backgroundHover='#FF5761'
                                    backgroundActive='#C60E2E'
                                    color='#FFFFFF'
                                    border='none'
                                    type="submit"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!isValid}
                                    padding='0'
                                    width='365px'
                                    marginTop='24px'
                                >
                                    <span>Sign Up</span>
                                </Button>
                                <AuthorizationText>
                                    Not a member yet? <Link to="/" style={{color:'red'}} >Sign In</Link>
                                </AuthorizationText>
                            </Container>

                        </Form>
                    </Container>
                    <Container backgroundProps='#F5FBFF' heightProps='100vh'  display='flex' flexDirection='column' justifyContent='center'>
                        <Image src={signUpImages} widthProps='660px' heightProps='414px'/>
                    </Container>

                </Container>
            </Container>
        </>
    );
};


const ContainerCheckBox = styled.div`
  display:flex;
  flexDirection:row;
  widthProps:366px;
  align-items: center;
  margin-top: 26px;
`

const ErrorsP = styled.p`
  color: #FF768E;
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`
const CheckBoxText = styled.span`
  padding-left: 8px;
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`













