import {FC, useState} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {Link,useNavigate} from "react-router-dom";
import signUpImages from "../../assests/images/signUpImages.png"
import closeEye from "../../assests/icons/close_eye.svg"
import openEye from "../../assests/icons/eye_rounded.svg"
import {post} from "../../api/baseFetch";


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
           reset()
        }
    }
    return (
        <>
            <Сontainer>
                <FormArticle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <H2>Sign Up</H2>
                        <Label htmlFor="name">Name</Label>
                        <Input borderColor={errors?.userName?'red': '#F6F6F6'}
                            id="name"
                            {...register("userName", { required: true})}
                        />
                        <div>
                            {errors?.userName && (<ErrorsP>{errors?.userName.message || "Required"}</ErrorsP>)}
                        </div>
                        <Label htmlFor="login">Login</Label>
                        <Input borderColor={errors?.login?'red': '#F6F6F6'}
                            id="login"
                            {...register("login", { required: true })}/>
                        <div>
                            {errors?.login && <ErrorsP>{errors?.login.message || "Required"}</ErrorsP>}
                        </div>
                        <Label htmlFor="password">Password</Label>
                        <InputContainer>
                            <Input borderColor={errors?.password?'red': '#F6F6F6'}
                                   id="password"
                                   {...register("password", { required: true})}
                                   type={typePassword}/>
                            {typePassword === 'password'?
                                (<Span onClick={() => setTypePassword('text')}><img src={closeEye}/></Span>):
                                (<Span onClick={()=> setTypePassword('password')}><img src={openEye}/></Span>)
                            }
                        </InputContainer>
                            <div>
                                {errors?.password && (<ErrorsP>{errors?.password.message || "Required"}</ErrorsP>)}
                            </div>
                        <Label htmlFor="returnPassword">Enter your password again</Label>
                        <InputContainer>
                            <Input borderColor={errors?.returnPassword?'red': '#F6F6F6'}
                                   id="returnPassword"
                                   type={typeReturnPassword}
                                   {...register("returnPassword", { required: true })}
                            />
                            {typeReturnPassword === 'password'?
                                (<Span onClick={() => setTypeReturnPassword('text')}><img src={closeEye}/></Span>):
                                (<Span onClick={()=> setTypeReturnPassword('password')}><img src={openEye}/></Span>)
                            }
                        </InputContainer>

                        <div>
                            {errors?.returnPassword && (<ErrorsP>{errors?.returnPassword.message || "Required"}</ErrorsP>)}
                        </div>
                        <CheckBox>
                            <InputCheckBox
                                type="checkbox"
                                {...register('checkBox',{required:true})} />
                            <PCheckbox>I accept the agreement</PCheckbox>
                        </CheckBox>
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isValid}
                        >
                            Sign Up
                        </Button>
                        <P>
                            Already a member? <Link to="/" style={{color:'red'}} >Sign In</Link>
                        </P>
                    </Form>
                </FormArticle>
                <ImgArticle>
                    <Img src={signUpImages} />
                </ImgArticle>
            </Сontainer>
        </>
    );
};

const Сontainer = styled.div`
  display:grid;
  grid-template-columns: 3fr 4fr;
  height: 100vh;
`
const FormArticle = styled.article`
  background-color: #FFF;
  height: 100vh;
`
const ImgArticle = styled.article`
  background-color: #F5FBFF;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 366px;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
`
const H2 = styled.h2`
  color: #344472;
  font-family: Avenir;
  font-weight: 400;
  font-size: 36px;
  line-height: 49.18px;
  width: 156px;
  height: 50px;
`
const Label = styled.label`
  width: 366px;
  height: 18px;
  font-family: Avenir;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #707070;
  padding-top: 8px;
`
const Input = styled.input<{borderColor?:string}>`
  width: 366px;
  height: 40px;
  background-color: #F6F6F6;
  border: ${props => `1px solid ${props.borderColor || '#707070'}`};
  border-radius: 4px;
  margin-top: 16px;
  &:hover{
    background-color: #D1D1D1;
  }
  &:focus{
    background-color: #F6F6F6;
  }
`
const CheckBox = styled.div <{borderColor?:string}>`
  display: flex;
  align-items: center;
  margin-top: 26px;
`
const InputCheckBox = styled.input`
  width: 16px;
  height: 16px;
`
const PCheckbox = styled.p`
  color: #707070;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  padding-left: 8px;
`
const Button = styled.button`
  background-color: #E4163A;
  color: #FFFFFF;
  width: 365px;
  height: 40px;
  border: none;
  margin-top: 24px;
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
const ErrorsP = styled.p`
  color: #FF768E;
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`
const Img = styled.img`
  width: 660px;
  height: 414px;
  margin-top: 170px;
  margin-left: 87px;
`
const InputContainer = styled.div`
  position: relative;
`
const Span =styled.span`
  position: absolute;
  content: '';
  top: 27px;
  right: 15px;
`












