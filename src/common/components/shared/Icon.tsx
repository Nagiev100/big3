import {FC, useState} from "react";
import styled, {css} from "styled-components";
import IconTeams from '../../../assests/icons/group_person.svg'
import {Container} from "./CenterImage";

interface IColorIcon {
    isActive : boolean,
}
interface IconComponentProps{
    iconSvg: Record<string, JSX.Element>;
    text: string;
    onClick:(iconType:string) => void,
    iconType:string,
    isActive:boolean
}







export const IconComponent : FC <IconComponentProps> = ({iconSvg,text,onClick,iconType,isActive}) => {
    const handleClick = () => {
        onClick(iconType)
    }
    const selectedIcon = isActive?'active':'default';
    return (
        <>
            <Container >
                <ColoredIcon isActive={isActive}  onClick={handleClick}>
                    {iconSvg[selectedIcon]}
                </ColoredIcon>
                <TextIcons isActive={isActive}>{text}</TextIcons>
            </Container>

        </>
    );
};
const ColoredIcon = styled.svg <IColorIcon>`
  width: 24px;
  height: 24px;
  margin-left: 30px;
  margin-top: 30px;
  path{
    fill:${(props) => props.isActive?'red':'' }
  }
`;
const TextIcons = styled.p<IColorIcon>`
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  margin-left: 25px;
  color:${(props) => props.isActive?'red': '#9C9C9C' };
  width: 38px;
`

