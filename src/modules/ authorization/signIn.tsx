import React, {FC, useState} from "react";
import { useForm} from "react-hook-form";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import closeEye from "../../assests/icons/close_eye.svg"
import openEye from "../../assests/icons/eye_rounded.svg"
import signInImages from '../../../src/assests/images/signInImages.png'
import {post} from "../../api/baseFetch";
import {useAppDispatch} from "../../core/redux/store";
import {addName} from "../../core/redux/reducer/userNameSlice";
import {Container} from "../../common/components/shared/CenterImage";
import {Image} from "../../common/components/shared/ImageCompanent";
import {Input} from "../../common/components/shared/InputComponent";
import {Button} from "../../common/components/shared/ButtonCompanent";
import {handleAuthorizationSignInError} from "../../common/components/shared/toastifyService";



interface SignInFormData {
  login: "string",
  password: "string"
}
export const SignIn: FC = () => {
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    register,
    formState: {  isValid },
  } = useForm<SignInFormData>();
  const [typePassword,setTypePassword] = useState('password')
  const [textError,setTextError] = useState(false)
  const navigate = useNavigate()


  const onSubmit = async (data: SignInFormData) => {
      try {
          const response = await post("Auth/SignIn",JSON.stringify(data))
          dispatch(addName(data.login))
          localStorage.setItem('token', response.token)
          navigate('/layout/teamsCard')
      }catch {
          setTextError(true)
          handleAuthorizationSignInError("User with the specified username / password was not found.")()
      }



  };
  return(
      <>
        <Container widthProps='100vw' heightProps='100vh' >
          <Container display='grid' gridTemplateColumn='3fr 4fr' >
           <Container backgroundProps='#FFFFFF' heightProps='100vh' display='flex' flexDirection='column' justifyContent='center'>
             <SloganAuthorization>Sign In</SloganAuthorization>
             <Form onSubmit={handleSubmit(onSubmit)}>
                 <Label htmlFor='name'>Name</Label>
                 <Input widthProps='366px' heightProps='40px' id='name' background='#F6F6F6'
                        {...register('login', {required:true})}/>
                 <ContainerInput>
                     <Label htmlFor='password'>Password</Label>
                     <Input widthProps='366px' heightProps='40px' id='password' background='#F6F6F6' type={typePassword}
                            {...register('password',{required:true})}
                     />
                     {
                         typePassword === 'password'?
                             (<ContainerIcon onClick={() => setTypePassword('text')}><img src={closeEye}/></ContainerIcon>):
                             (<ContainerIcon onClick={() => setTypePassword('password')}><img src={openEye}/></ContainerIcon>)
                     }
                     {
                         textError&& <TextError>Wrong password. Please, try again.</TextError>
                     }
                 </ContainerInput>
             </Form>
               <Container display='flex' flexDirection='column'>
                   <Button
                       backgroundColor='#E4163A'
                       backgroundHover='#FF5761'
                       backgroundActive='#C60E2E'
                       border='none'
                       color='#FFFFFF'
                       type="submit"
                       onClick={handleSubmit(onSubmit)}
                       disabled={!isValid}
                       padding='0'
                       width='365px'
                       marginTop='26px'
                   >
                       <span>Sign In</span>
                   </Button>
                   <AuthorizationText>
                     Not a member yet? <Link to="signUp" style={{color:'red'}} >Sign Up</Link>
                   </AuthorizationText>
               </Container>
           </Container>
           <Container backgroundProps='#F5FBFF' heightProps='100vh'  display='flex' flexDirection='column' justifyContent='center'>
             <Image src={signInImages} widthProps='605.46px' heightProps='412.05px'/>
           </Container>
         </Container>
        </Container>
      </>
  )

};

export const SloganAuthorization =styled.h2`
  color: #344472;
  width: 130px;
  height: 50px;
  font-size: 36px;
  font-weight: 400;
  margin-right: 240px;
  
`
export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
export const ContainerIcon = styled.span`
  position: absolute;
  content: '';
  top:62px;
  left: 340px;
`
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #707070;
  margin-top: 26px;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
 export const AuthorizationText =styled.p`
   color: #707070;
   font-size: 14px;
   font-weight: 500;
   line-height: 24px;
   text-align: left;
   margin-top: 24px;
`
const TextError = styled.p`
  color: #FF768E;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
`







