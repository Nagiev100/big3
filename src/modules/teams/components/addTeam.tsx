import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ClickedImg from "../../../assests/images/cllickerPhoto.svg";
import { post, put } from "../../../api/baseFetch";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../core/redux/store";
import { Container } from "../../../common/components/shared/CenterImage";
import { AddTextLogo } from "../../../common/components/shared/AddTextLogo";
import { Image } from "../../../common/components/shared/ImageCompanent";
import { ContainerClickedImg } from "../../../common/components/shared/ContainerClickedImg";
import { Input } from "../../../common/components/shared/InputComponent";
import { Form, Label } from "../../authorization/signIn";
import { useNotifyAlert } from "../../../common/hooks/useNotifyAlert";

interface addTeamFormData {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}

export const AddTeam: FC = () => {
  const navigate = useNavigate();
  const teamData = useAppSelector((state) => state.team.currentTeam);
  const [params] = useSearchParams();
  const isEdit = params.get("edit");
  const filePicker = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    isEdit && teamData?.imageUrl ? teamData?.imageUrl : null,
  );
  const { triggerNotifyComponent, notifyComponent } = useNotifyAlert();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<addTeamFormData>({
    mode: "onBlur",
    defaultValues: isEdit
      ? {
          name: teamData?.name,
          foundationYear: teamData?.foundationYear,
          division: teamData?.division,
          conference: teamData?.conference,
        }
      : undefined,
  });
  const goBack = () => {
    navigate(-1);
  };

  const addImg = async () => {
    const image = filePicker.current?.files;
    const selectedImage = image?.[0] as Blob;
    const isPng = selectedImage?.type == "image/png";
    if (isPng) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", selectedImage, image?.[0]?.name);
      const imagePath = await fetch(
        "http://dev.trainee.dex-it.ru/api/Image/SaveImage",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        },
      );
      const resultString = await imagePath?.json();
      setPreviewImage(resultString);
    } else {
      triggerNotifyComponent({
        text: "only png",
      });
    }
  };

  const onSubmit = async (propData: addTeamFormData) => {
    const token = localStorage.getItem("token");
    const data = { ...propData, imageUrl: previewImage };

    try {
      if (previewImage) {
        // @ts-ignore
        data.imageUrl = previewImage;
        let response;
        if (isEdit) {
          response = await put(
            "Team/Update",
            JSON.stringify({ ...data, id: teamData.id }),
            `${token}`,
          );
        } else {
          response = await post("Team/Add", JSON.stringify(data), `${token}`);
        }
        if (response) {
          reset();
          navigate("/layout/teamsCard");
        }
      }
    } catch {
      triggerNotifyComponent({
        text: "A team with the same name already exists.",
      });
    }
  };

  const handlePick = () => {
    if (filePicker.current !== null) {
      filePicker.current.click();
    }
  };

  return (
    <>
      <ContainerAddTeam>
        <Container
          heightProps="69px"
          backgroundProps="#FFFFFF"
          widthProps={"100%"}
        >
          <CustomNavLink to={"/layout/teamsCard"}>
            <AddTextLogo beforePaddingLeft="40px">
              Teams Add new team
            </AddTextLogo>
          </CustomNavLink>
        </Container>
        <ContainerAddTeamGrid>
          <ContainerClickedImg
            marginTop="48px"
            marginLeft="73px"
            onClick={handlePick}
            background="#9C9C9C"
            backgroundImage={
              previewImage
                ? `url("http://dev.trainee.dex-it.ru${previewImage}")`
                : undefined
            }
          >
            <Image src={ClickedImg} widthProps="74px" heightProps="75px" />
          </ContainerClickedImg>
          <ContainerInputAddTeam>
            <Form>
              <Label>Name</Label>
              <Input
                borderColor={errors?.name ? "#FF768E" : "#F6F6F6"}
                background="#F6F6F6"
                widthProps="366px"
                heightProps="40px"
                {...register("name", {
                  required: "Required",
                  pattern: {
                    value: /[a-z]/,
                    message: "Only [a-z] can be used",
                  },
                })}
              />
              <ContainerErrors>
                {errors?.name && (
                  <ErrorsText>{errors?.name?.message}</ErrorsText>
                )}
              </ContainerErrors>
              <Label>Division</Label>
              <Input
                borderColor={errors?.division ? "#FF768E" : "#F6F6F6"}
                background="#F6F6F6"
                widthProps="366px"
                heightProps="40px"
                {...register("division", { required: "Required" })}
              />
              <ContainerErrors>
                {errors?.division && (
                  <ErrorsText>{errors?.division?.message}</ErrorsText>
                )}
              </ContainerErrors>
              <Label>Conference</Label>
              <Input
                borderColor={errors?.conference ? "#FF768E" : "#F6F6F6"}
                background="#F6F6F6"
                widthProps="366px"
                heightProps="40px"
                {...register("conference", { required: "Required" })}
              />
              <ContainerErrors>
                {errors?.conference && (
                  <ErrorsText>{errors?.conference?.message}</ErrorsText>
                )}
              </ContainerErrors>
              <Label>Year of foundation</Label>
              <Input
                borderColor={errors?.foundationYear ? "#FF768E" : "#F6F6F6"}
                background="#F6F6F6"
                widthProps="366px"
                heightProps="40px"
                {...register("foundationYear", {
                  required: "Required",
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Only numbers can be used",
                  },
                })}
              />
              <ContainerErrors>
                {errors?.foundationYear && (
                  <ErrorsText>{errors?.foundationYear?.message}</ErrorsText>
                )}
              </ContainerErrors>
            </Form>
          </ContainerInputAddTeam>
        </ContainerAddTeamGrid>

        <ContainerButton
          display="flex"
          flexDirection="row"
          marginTop="26px"
          marginLeft="625px"
        >
          <ButtonCansel onClick={goBack}>
            <span>Cancel</span>
          </ButtonCansel>
          <ButtonSave
            onClick={handleSubmit(onSubmit)}
            type="submit"
            disabled={!isValid}
          >
            <span>Save</span>
          </ButtonSave>
        </ContainerButton>
        <InputFile type="file" ref={filePicker} onInputCapture={addImg} />
      </ContainerAddTeam>
      {notifyComponent}
    </>
  );
};
export const ButtonCansel = styled.button`
  width: 171px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #9c9c9c;
  color: #9c9c9c;
  &:hover {
    background-color: #9c9c9c;
    color: white;
  }
  &:active {
    background-color: #707070;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    max-width: 300px;
    margin-top: 26px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 26px;
  }
`;
export const ButtonSave = styled.button`
  width: 171px;
  height: 40px;
  border: 1px solid #9c9c9c;
  color: #fff;
  margin-left: 24px;
  background-color: #e4163a;
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
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin-top: 26px;
    max-width: 300px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 26px;
  }
`;
const ContainerAddTeam = styled.div`
  max-width: 1140px;
  height: 545px;
  background-color: #ffffff;
  margin-left: 80px;
  margin-top: 32px;
  @media ${(props) => props.theme.tablet} {
    margin: 0 auto;
    width: 100%;
    padding: 0 24px;
    height: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    width: 100%;
    padding: 0 24px;
    height: 100%;
  }
`;
const ContainerAddTeamGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 1fr;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
  }
`;
const ContainerInputAddTeam = styled.div`
  margin-left: 136px;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin: 0 auto;
    max-width: 600px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0 auto;
  }
`;
export const InputFile = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  line-height: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;
export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;
const ContainerErrors = styled.div`
  height: 2px;
`;
const ErrorsText = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #ff768e;
`;
export const ContainerButton = styled(Container)`
  @media ${(props) => props.theme.tablet} {
    justify-content: space-between;
    max-width: 600px;
  }
`;
