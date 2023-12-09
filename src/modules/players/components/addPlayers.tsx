import { FC, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ClickedImg from "../../../assests/images/cllickerPhoto.svg";
import { get, post, put } from "../../../api/baseFetch";
import { Container } from "../../../common/components/shared/CenterImage";
import { Image } from "../../../common/components/shared/ImageCompanent";
import { Input } from "../../../common/components/shared/InputComponent";
import { AddTextLogo } from "../../../common/components/shared/AddTextLogo";
import { ITypeTeam } from "../../../core/redux/reducer/teamSlice";
import { Form, Label } from "../../authorization/signIn";
import { ContainerClickedImg } from "../../../common/components/shared/ContainerClickedImg";
import { ButtonCansel, ButtonSave } from "../../teams/components/addTeam";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../core/redux/store";
import styled from "styled-components";

interface addPlayersFromData {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
}

export interface IOptions {
  value: string;
  label: string;
}

export const AddPlayer: FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isEdit = params.get("edit");
  const filePicker = useRef<HTMLInputElement>(null);
  const playerData = useAppSelector((state) => state.player.currentPlayer);
  const [positions, setPositions] = useState<string[]>([]);
  const [position, setPosition] = useState<string>("");
  const [teams, setTeams] = useState<IOptions[]>([]);
  const [team, setTeam] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<addPlayersFromData>({
    mode: "onBlur",
    defaultValues: isEdit
      ? {
          name: playerData.name,
          position: playerData.position,
          team: playerData.team,
          height: playerData.height,
          weight: playerData.weight,
          birthday: playerData.birthday,
          number: playerData.number,
        }
      : undefined,
  });

  useEffect(() => {
    const fetchDetailing = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await get(`Player/GetPositions`, token!);

        setPositions(response);
      } catch {
        console.log("error");
      }
    };
    fetchDetailing();
  }, []);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await get("Team/GetTeams", token!!);
        setTeams(
          response.data.map((team: ITypeTeam) => ({
            value: team.id,
            label: team.name,
          })),
        );
      } catch {
        console.log("error");
      }
    };
    getTeam();
  }, []);
  const handlePick = () => {
    if (filePicker.current !== null) {
      filePicker.current.click();
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const colourStyles = {
    control: (base: {}) => ({
      ...base,
      boxShadow: "none",
      height: "40px",
      background: "#F6F6F6",
      border: "none",
    }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#C60E2E" : null,
        color: isFocused ? "#ffffff" : null,
      };
    },
  };

  const optionsPosition: IOptions[] = positions.map((p) => ({
    value: p,
    label: p,
  }));

  const addImg = async () => {
    const image = filePicker.current?.files;
    const selectedImage = image?.[0] as Blob;
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
  };

  const onSubmit = async (propData: addPlayersFromData) => {
    const token = localStorage.getItem("token");
    const resultBody = {
      ...propData,
      avatarUrl: previewImage,
      position: position,
      team: team,
    };
    try {
      if (previewImage) {
        // @ts-ignore
        resultBody.avatarUrl = previewImage;
        let response;
        if (isEdit) {
          response = await put(
            "Player/Update",
            JSON.stringify({ ...resultBody, id: playerData.id }),
            `${token}`,
          );
        } else {
          response = await post(
            "Player/Add",
            JSON.stringify(resultBody),
            `${token}`,
          );
        }
        if (response) {
          reset();
          navigate("/layout/playersCard");
        }
      }
    } catch (e: any) {}
  };

  // @ts-ignore
  return (
    <>
      <ContainerAddPlayer>
        <Container heightProps="69px" backgroundProps="#FFFFFF">
          <AddTextLogo beforePaddingLeft="45px">
            Players Add new player
          </AddTextLogo>
        </Container>
        <ContainerAddPlayerGrid>
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

          <ContainerInputAddPlayer>
            <Form>
              <Label htmlFor="name">Name</Label>
              <Input
                borderColor={errors?.name ? "red" : "#F6F6F6"}
                background="#F6F6F6"
                widthProps="366px"
                heightProps="40px"
                id="name"
                {...register("name", { required: true })}
              />
              <Container widthProps={"366px"} marginTop="26px">
                <Label htmlFor="position">Position</Label>
                <Select
                  id="position"
                  options={optionsPosition}
                  onChange={(data) => setPosition(data?.value || "")}
                  styles={colourStyles}
                />
              </Container>
              <Container widthProps={"366px"} marginTop="26px">
                <Label htmlFor="team">Team</Label>
                <Select
                  id="team"
                  options={teams}
                  onChange={(data) => setTeam(data?.value || "")}
                  styles={colourStyles}
                />
              </Container>
              <Container widthProps={"366px"}>
                <ContainerGridInput>
                  <Container>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      widthProps="171px"
                      heightProps="40px"
                      borderColor={errors?.height ? "#FF768E" : "#F6F6F6"}
                      background="#F6F6F6"
                      id="height"
                      {...register("height", { required: true })}
                    />
                  </Container>
                  <Container>
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input
                      id={"birthday"}
                      type={"Date"}
                      widthProps={"171px"}
                      heightProps={"40px"}
                      background={"#f6f6f6"}
                      borderColor={"#f6f6f6"}
                      {...register("birthday", { required: true })}
                    />
                  </Container>

                  <Container marginTop="16px">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      widthProps="171px"
                      heightProps="40px"
                      borderColor={errors?.weight ? "#FF768E" : "#F6F6F6"}
                      id="weight"
                      {...register("weight", { required: true })}
                      background="#F6F6F6"
                    />
                  </Container>
                  <Container marginTop="16px">
                    <Label htmlFor="number">Number</Label>
                    <Input
                      widthProps="171px"
                      heightProps="40px"
                      borderColor={errors?.number ? "#FF768E" : "#F6F6F6"}
                      background="#F6F6F6"
                      id="number"
                      {...register("number", { required: true })}
                    />
                  </Container>
                </ContainerGridInput>
              </Container>
              <InputFilePlayer
                type="file"
                ref={filePicker}
                onInputCapture={addImg}
              />
            </Form>
          </ContainerInputAddPlayer>
        </ContainerAddPlayerGrid>
        <Container
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
        </Container>
      </ContainerAddPlayer>
    </>
  );
};

const CustomDatePickerInput = styled(Input)`
  width: 171px;
  height: 40px;
  bordercolor: #f6f6f6;
  background: #f6f6f6;
`;

const ContainerAddPlayer = styled.div`
  width: 1140px;
  height: 655px;
  background-color: #ffffff;
  margin-left: 80px;
  margin-top: 32px;
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding: 0 24px;
  }
`;
const ContainerAddPlayerGrid = styled.div`
  max-width: 1140px;
  display: grid;
  grid-template-columns: 3fr 4fr;
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
  }
`;
const ContainerInputAddPlayer = styled.div`
  margin-left: 136px;
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    width: 100%;
  }
`;
const ContainerGridInput = styled.div`
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 26px;
  max-width: 1140px;
  display: grid;
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    width: 100%;
  }
`;
const InputFilePlayer = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  line-height: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;
