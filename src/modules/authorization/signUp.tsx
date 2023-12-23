import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import signUpImages from "../../assests/images/signUpImages.png";
import closeEye from "../../assests/icons/close_eye.svg";
import openEye from "../../assests/icons/eye_rounded.svg";
import { post } from "../../api/baseFetch";
import { Container } from "../../common/components/shared/CenterImage";
import { Image } from "../../common/components/shared/ImageCompanent";
import {
  AuthorizationText,
  ContainerIcon,
  ContainerInput,
  Form,
  Label,
  SloganAuthorization,
} from "./signIn";
import { Input } from "../../common/components/shared/InputComponent";
import { useNotifyAlert } from "../../common/hooks/useNotifyAlert";

interface SignUpFormData {
  userName: string;
  login: string;
  password: string;
  returnPassword?: string;
  checkBox?: true;
}

export const SignUp: FC = () => {
  const navigator = useNavigate();
  const [typePassword, setTypePassword] = useState("password");
  const [typeReturnPassword, setTypeReturnPassword] = useState("password");
  const { triggerNotifyComponent, notifyComponent } = useNotifyAlert();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setError,
  } = useForm<SignUpFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    const resultData = {
      userName: data.userName,
      login: data.login,
      password: data.password,
    };

    if (data.password !== data.returnPassword) {
      setError("returnPassword", {
        type: "manual",
        message: "Пароли не совпадают",
      });
    } else {
      try {
        const response = await post("Auth/SignUp", JSON.stringify(resultData));
        if (response) {
          localStorage.setItem("token", response.token);
        }
        navigator("/layout/teamsCard");
      } catch {
        triggerNotifyComponent({
          text: "A user with the same name already exists",
        });
      }
    }
  };
  return (
    <>
      <Container widthProps="100vw" heightProps="100vh">
        <Wrapper display="grid" gridTemplateColumn="3fr 4fr">
          <Container
            backgroundProps="#FFFFFF"
            heightProps="100vh"
            widthProps={"100%"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <SloganAuthorization>Sign Up</SloganAuthorization>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="name">Name</Label>
              <Input
                borderColor={errors?.userName ? "#FF768E" : "#F6F6F6"}
                widthProps="366px"
                heightProps="40px"
                id="name"
                background="#F6F6F6"
                {...register("userName", { required: true })}
              />
              <ContainerErrors>
                {errors?.userName && (
                  <ErrorsP>{errors?.userName.message || "Required"}</ErrorsP>
                )}
              </ContainerErrors>
              <Label htmlFor="login">Login</Label>
              <Input
                borderColor={errors?.login ? "#FF768E" : "#F6F6F6"}
                widthProps="366px"
                heightProps="40px"
                id="login"
                background="#F6F6F6"
                {...register("login", { required: true })}
              />
              <ContainerErrors>
                {errors?.login && (
                  <ErrorsP>{errors?.login.message || "Required"}</ErrorsP>
                )}
              </ContainerErrors>
              <ContainerInput>
                <Label htmlFor="password">Password</Label>
                <Input
                  borderColor={errors?.password ? "#FF768E" : "#F6F6F6"}
                  widthProps="366px"
                  heightProps="40px"
                  id="password"
                  background="#F6F6F6"
                  type={typePassword}
                  {...register("password", { required: true })}
                />
                {typePassword === "password" ? (
                  <ContainerIcon onClick={() => setTypePassword("text")}>
                    <img src={closeEye} />
                  </ContainerIcon>
                ) : (
                  <ContainerIcon onClick={() => setTypePassword("password")}>
                    <img src={openEye} />
                  </ContainerIcon>
                )}
                <ContainerErrors>
                  {errors?.password && (
                    <ErrorsP>{errors?.password.message || "Required"}</ErrorsP>
                  )}
                </ContainerErrors>
              </ContainerInput>
              <ContainerInput>
                <Label htmlFor="returnPassword">
                  Enter your password again
                </Label>
                <Input
                  borderColor={errors?.returnPassword ? "#FF768E" : "#F6F6F6"}
                  widthProps="366px"
                  heightProps="40px"
                  id="returnPassword"
                  background="#F6F6F6"
                  type={typeReturnPassword}
                  {...register("returnPassword", { required: true })}
                />
                {typeReturnPassword === "password" ? (
                  <ContainerIcon onClick={() => setTypeReturnPassword("text")}>
                    <img src={closeEye} />
                  </ContainerIcon>
                ) : (
                  <ContainerIcon
                    onClick={() => setTypeReturnPassword("password")}
                  >
                    <img src={openEye} />
                  </ContainerIcon>
                )}
                <ContainerErrors>
                  {errors?.returnPassword && (
                    <ErrorsP>
                      {errors?.returnPassword.message || "Required"}
                    </ErrorsP>
                  )}
                </ContainerErrors>
              </ContainerInput>

              <ContainerCheckBox>
                <RedInput
                  id="checkBox"
                  type="checkbox"
                  {...register("checkBox", { required: true })}
                />
                <label htmlFor="checkBox">I accept the agreement</label>
              </ContainerCheckBox>

              <Container
                display="flex"
                flexDirection="column"
                widthProps={"100%"}
              >
                <ButtonSignUp
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid}
                >
                  <span>Sign Up</span>
                </ButtonSignUp>
                <AuthorizationText>
                  Not a member yet?{" "}
                  <Link to="/" style={{ color: "red" }}>
                    Sign In
                  </Link>
                </AuthorizationText>
              </Container>
            </Form>
          </Container>
          <ContainerMedia>
            <Container
              backgroundProps="#F5FBFF"
              heightProps="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Image
                src={signUpImages}
                widthProps="660px"
                heightProps="414px"
              />
            </Container>
          </ContainerMedia>
        </Wrapper>
      </Container>
      {notifyComponent}
    </>
  );
};

const Wrapper = styled(Container)`
  @media ${(props) => props.theme.tablet} {
    display: grid;
    margin: auto;
    grid-template-columns: 1fr;
    padding: 0 100px;
    max-width: 600px;
  }
  @media ${(props) => props.theme.mobile} {
    display: grid;
    grid-template-columns:1fr;
    padding: 0 24px
`;

const RedInput = styled.input`
  accent-color: #e4163a;
  margin-right: 8px;
`;
const ContainerCheckBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 26px;
  @media ${(props) => props.theme.tablet} {
    margin-top: 26px;
  }
  @media ${(props) => props.theme.mobile} {
    margin-top: 26px;
  }
`;
export const ErrorsP = styled.p`
  color: #ff768e;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`;
const ContainerMedia = styled.div`
  @media ${(props) => props.theme.tablet} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
export const ContainerErrors = styled.div`
  height: 2px;
`;
export const ButtonSignUp = styled.button`
  background-color: #e4163a;
  color: #ffffff;
  border: none;
  padding: 0;
  width: 365px;
  margin-top: 24px;
  height: 40px;
  &:hover {
    background-color: #ff5761;
  }
  &:active {
    background-color: #c60e2e;
  }
  &:disabled {
    background-color: #f6f6f6;
    color: #d1d1d1;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-right: 0;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin-right: 0;
  }
`;
