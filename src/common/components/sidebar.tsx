import React, {FC, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import OutIcons from "../../assests/icons/outIcons.png";
import styled from "styled-components";
import {IconComponent} from '../../common/components/shared/Icon'
import {Container} from '../components/shared/CenterImage'
import {Image} from "./shared/ImageCompanent";


export const Sidebar : FC = () => {
    const navigate = useNavigate()
    const [activeLink,setActiveLink] =useState('')
    const out = () => {
        localStorage.removeItem("token")
        navigate('/')
    }
    const iconSvg = {
        default:(
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.9899 8C10.9899 9.66 9.65992 11 7.99992 11C6.33992 11 4.99992 9.66 4.99992 8C4.99992 6.34 6.33992 5 7.99992 5C9.65992 5 10.9899 6.34 10.9899 8ZM18.99 8C18.99 9.66 17.66 11 16 11C14.34 11 13 9.66 13 8C13 6.34 14.34 5 16 5C17.66 5 18.99 6.34 18.99 8ZM8 13C5.67 13 1 14.17 1 16.5V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V16.5C15 14.17 10.33 13 8 13ZM15.0301 13.05C15.3801 13.02 15.7101 13 16.0001 13C18.3301 13 23.0001 14.17 23.0001 16.5V18C23.0001 18.55 22.5501 19 22.0001 19H16.8201C16.9301 18.69 17.0001 18.35 17.0001 18V16.5C17.0001 15.03 16.2101 13.92 15.0701 13.09C15.0671 13.0869 15.064 13.083 15.0607 13.0787C15.0531 13.0688 15.044 13.0569 15.0301 13.05Z"
                    fill="#9C9C9C"
                />
            </svg>
        ),
        active:(
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.9899 8C10.9899 9.66 9.65989 11 7.99989 11C6.33989 11 4.99989 9.66 4.99989 8C4.99989 6.34 6.33989 5 7.99989 5C9.65989 5 10.9899 6.34 10.9899 8ZM18.99 8C18.99 9.66 17.66 11 16 11C14.34 11 13 9.66 13 8C13 6.34 14.34 5 16 5C17.66 5 18.99 6.34 18.99 8ZM7.99997 13C5.66997 13 0.999969 14.17 0.999969 16.5V18C0.999969 18.55 1.44997 19 1.99997 19H14C14.55 19 15 18.55 15 18V16.5C15 14.17 10.33 13 7.99997 13ZM15.0301 13.05C15.3801 13.02 15.7101 13 16.0001 13C18.33 13 23 14.17 23 16.5V18C23 18.55 22.55 19 22 19H16.8201C16.93 18.69 17 18.35 17 18V16.5C17 15.03 16.2101 13.92 15.0701 13.09C15.067 13.0869 15.064 13.083 15.0607 13.0787C15.0531 13.0688 15.044 13.0569 15.0301 13.05Z"
                    fill="#E4163A"
                />
            </svg>
        )
    }
    const iconPlayerSvg = {
        default:(
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.9999 8C15.9999 10.21 14.2099 12 11.9999 12C9.78989 12 7.99989 10.21 7.99989 8C7.99989 5.79 9.78989 4 11.9999 4C14.2099 4 15.9999 5.79 15.9999 8ZM3.99997 18C3.99997 15.34 9.32997 14 12 14C14.67 14 20 15.34 20 18V19C20 19.55 19.55 20 19 20H4.99997C4.44997 20 3.99997 19.55 3.99997 19V18Z"
                    fill="#9C9C9C"
                />
            </svg>
        ),
        active:(
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.9999 8C15.9999 10.21 14.2099 12 11.9999 12C9.78992 12 7.99992 10.21 7.99992 8C7.99992 5.79 9.78992 4 11.9999 4C14.2099 4 15.9999 5.79 15.9999 8ZM4 18C4 15.34 9.33 14 12 14C14.67 14 20 15.34 20 18V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V18Z"
                    fill="#E4163A"
                />
            </svg>

        )
    }
    const handleIconClick = (iconType:any) =>{
        setActiveLink(iconType === 'player'? 'playersCard' : 'teamsCard')
    }
    const handleLinkClick = (linkType:any) =>{
        setActiveLink(linkType)
    }

    return(
        <>
            <Container display='flex' flexDirection='column' justifyContent='space-between' widthProps='100%' heightProps='100%'>
                <Container widthProps='100%' heightProps='100%' marginLeft='51px' marginTop='32px'>
                    <Container>
                        <NavLink
                            to="teamsCard"
                            onClick={() => handleLinkClick('teamsCard')}>
                            <IconComponent
                                iconSvg={iconSvg}
                                text={'Teams'}
                                onClick={() => handleIconClick('teamsCard')}
                                isActive={activeLink === 'teamsCard'}
                                iconType={'teamsCard'}
                            />
                        </NavLink>
                    </Container>

                    <NavLink
                        to="playersCard"
                        onClick={() => handleLinkClick('playersCard')}>
                        <IconComponent
                        iconSvg={iconPlayerSvg}
                        text={'Players'}
                        onClick={() => handleIconClick('playersCarders') }
                        isActive={activeLink === 'playersCard'}
                        iconType={'playersCard'}
                        />
                    </NavLink>
                </Container>
                <Container onClick={out}>
                    <Image src={OutIcons} marginLeft='15px'/>
                    <ButtonText>Sign out</ButtonText>
                </Container>
            </Container>
        </>
    )
}


const ImgGroupIcons = styled.img`
  width:24px;
  height: 24px;
  margin-left: 7px;
`

const TextIcons = styled.p`
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #9C9C9C;
  width: 38px;
`
const ImgPersonIcons = styled.img`
  width:24px;
  height: 24px;
  margin-left: 7px;
  margin-top: 36px;
`
const ButtonSaybar = styled.button`
  display: flex;
  flex-direction: column;
  border: none;
  background-color: #FFF;
`
const ButtonImg = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
`
const ButtonText = styled.p`
  width: 46px;
  height: 18px;
  font-family: Avenir;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #FF768E;
  margin-left: 5px;
  margin-bottom: 32px;
`





