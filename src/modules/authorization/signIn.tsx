import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import closeEye from "../../assests/icons/close_eye.svg";
import openEye from "../../assests/icons/eye_rounded.svg";
import signInImages from "../../../src/assests/images/signInImages.png";
import { post } from "../../api/baseFetch";
import { Container } from "../../common/components/shared/CenterImage";
import { Image } from "../../common/components/shared/ImageCompanent";
import { Input } from "../../common/components/shared/InputComponent";
import { useNotifyAlert } from "../../common/hooks/useNotifyAlert";

interface SignInFormData {
  login: "string";
  password: "string";
}

export const SignIn: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    mode: "onBlur",
  });
  const [typePassword, setTypePassword] = useState("password");
  const [textError, setTextError] = useState(false);
  const { triggerNotifyComponent, notifyComponent } = useNotifyAlert();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await post("Auth/SignIn", JSON.stringify(data));
      localStorage.setItem("name", response?.name);
      localStorage.setItem("token", response?.token);
      navigate("/layout/teamsCard");
    } catch {
      setTextError(true);
      triggerNotifyComponent({
        text: "User with the specified username / password was not found.",
      });
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
            <SloganAuthorization>Sign In</SloganAuthorization>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="name">Name</Label>
              <Input
                borderColor={errors?.login ? "#FF768E" : "#F6F6F6"}
                widthProps="366px"
                heightProps="40px"
                id="name"
                background="#F6F6F6"
                {...register("login", { required: true })}
              />
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
                {textError && (
                  <TextError>Wrong password. Please, try again.</TextError>
                )}
              </ContainerInput>
            </Form>
            <Container
              display="flex"
              widthProps={"100%"}
              flexDirection="column"
            >
              <ButtonSignIn
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                <span>Sign In</span>
              </ButtonSignIn>
              <AuthorizationText>
                Not a member yet?{" "}
                <Link to="signUp" style={{ color: "red" }}>
                  Sign Up
                </Link>
              </AuthorizationText>
            </Container>
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
                src={signInImages}
                widthProps="605.46px"
                heightProps="412.05px"
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
    grid-template-columns: 1fr;
    padding: 0 24px;
  }
`;

const ContainerMedia = styled.div`
  @media ${(props) => props.theme.tablet} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

export const SloganAuthorization = styled.h2`
  color: #344472;
  width: 130px;
  height: 50px;
  font-size: 36px;
  font-weight: 400;
  margin-right: 240px;
  @media ${(props) => props.theme.tablet} {
    margin-right: 0px;
  }
  @media ${(props) => props.theme.mobile} {
    margin-right: 0px;
  }
`;
export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const ContainerIcon = styled.span`
  position: absolute;
  content: "";
  top: 62px;
  left: 340px;
  @media ${(props) => props.theme.tablet} {
    left: auto;
    top: auto;
    bottom: 6px;
    right: 8px;
  }
  @media ${(props) => props.theme.mobile} {
    left: auto;
    top: auto;
    bottom: 6px;
    right: 8px;
  }
`;
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #707070;
  margin-top: 26px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
export const AuthorizationText = styled.p`
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  margin-top: 24px;
`;
const TextError = styled.p`
  color: #ff768e;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
`;
export const ButtonSignIn = styled.button`
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
