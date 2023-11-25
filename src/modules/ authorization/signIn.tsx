import React, {FC, useState} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import closeEye from "../../assests/icons/close_eye.svg"
import openEye from "../../assests/icons/eye_rounded.svg"
import signInImages from '../../../src/assests/images/signInImages.png'
import {post} from "../../api/baseFetch";
import {useAppDispatch, useAppSelector} from "../../core/redux/store";
import {addName} from "../../core/redux/reducer/userNameSlice";

interface SignInFormData {
  login: "string",
  password: "string"
}
export const SignIn: FC = () => {
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<SignInFormData>();
  const [typePassword,setTypePassword] = useState('password')
  const navigate = useNavigate()


  const onSubmit = async (data: SignInFormData) => {
    const response = await post("Auth/SignIn",JSON.stringify(data))

      if(response){
        dispatch(addName(data.login))
        localStorage.setItem('token', response.token)
        navigate('/layout/teamsCard')
      }

  };
  return(
      <>
        <Container>
          <FormSection>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <H1>Sign In</H1>
              <Label htmlFor='login'>Login</Label>
              <Input borderColor={errors?.login?'red': '#F6F6F6' }
                  id='login'
                  {...register('login',{required:true})}
              />
              <Label htmlFor='password'>Password</Label>
              <InputContainer>
                <Input borderColor={errors?.password?'#FF768E':'#F6F6F6'}
                    id='password'
                    {...register('password',{required:true})}
                />
                {typePassword === 'password'?
                    (<Span onClick={()=> setTypePassword('text')}><img src={closeEye}/></Span>):
                    (<Span onClick={()=> setTypePassword('password')}><img src={openEye}/></Span>)
                }
              </InputContainer>
              <Button type='submit' onSubmit={handleSubmit(onSubmit)} disabled={!isValid}>Sign In</Button>
              <P>
                Not a member yet?
                <Link to='/signUp' style={{color:'#E4163A'}}>Sign Up</Link>
              </P>
            </Form>
          </FormSection>
          <SectionImg>
            <Img src={signInImages}/>
          </SectionImg>
        </Container>
      </>
  )

};

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  height: 100vh;
`;

const FormSection = styled.article`
  background-color: #FFF;
  height: 100vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 366px;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
`
const H1 = styled.h1`
  color: #344472;
  font-family: Avenir;
  width: 130px;
  height: 50px;
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 32px;
`
const Label = styled.label`
  width: 366px;
  height: 18px;
  font-family: Avenir;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #707070;
  margin-bottom: 8px;
`
const Input = styled.input<{borderColor?:string}>`
  outline: none;
  width: 366px;
  height: 40px;
  background-color: #F6F6F6;
  border-radius: 4px;
  border: ${props => `1px solid ${props.borderColor || '#707070'}`};
  margin-bottom: 26px;
  &:hover{
    background-color: #D1D1D1;
  }
  &:focus{
    background-color: #F6F6F6;
  }
`
const Button = styled.button`
  background-color: #E4163A;
  color: #FFFFFF;
  width: 365px;
  height: 40px;
  border: none;
  &:default{
    background-color: #E4163A;
  };
  &:hover{
    background-color: #FF5761;
  }; 
  &:active{
    background-color: #C60E2E;
  };
  `
const P = styled.p`
  color: #707070;
  padding-left: 91px;
  padding-top: 24px;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px
`
const InputContainer = styled.div`
  position: relative;
`
const Span = styled.span`
  position: absolute;
  content: '';
  top: 13px;
  right: 10px;
`
const SectionImg = styled.section`
  height: 100vh;
  background-color: #F5FBFF;
`

const Img = styled.img`
  width: 605px;
  height: 412px;
  margin-top: 180px;
  margin-left: 150px;
`

