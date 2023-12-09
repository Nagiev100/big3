import { FC } from "react";
import styled from "styled-components";

interface IColorIcon {
  isActive: boolean;
}
interface IconComponentProps {
  iconSvg: Record<string, JSX.Element>;
  text: string;
  onClick?: (iconType: string) => void;
  iconType: string;
  isActive: boolean;
}

export const IconComponent: FC<IconComponentProps> = ({
  iconSvg,
  text,
  onClick,
  iconType,
  isActive,
}) => {
  const handleClick = () => {
    onClick?.(iconType);
  };
  const selectedIcon = isActive ? "active" : "default";
  return (
    <>
      <ContainerIconSidebar>
        <ColoredIcon isActive={isActive} onClick={handleClick}>
          {iconSvg[selectedIcon]}
        </ColoredIcon>
        <TextIcons isActive={isActive}>{text}</TextIcons>
      </ContainerIconSidebar>
    </>
  );
};
const ContainerIconSidebar = styled.div`
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
  }
`;
const ColoredIcon = styled.svg<IColorIcon>`
  width: 24px;
  height: 24px;
  margin-left: 30px;
  margin-top: 30px;
  path {
    fill: ${(props) => (props.isActive ? "red" : "")};
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0;
  }
`;
const TextIcons = styled.p<IColorIcon>`
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  margin-left: 25px;
  text-decoration: none;
  color: ${(props) => (props.isActive ? "red" : "#9C9C9C")};
  width: 38px;
  @media ${(props) => props.theme.mobile} {
    margin: 0;
    padding-left: 8px;
    padding-top: 4px;
  }
`;
