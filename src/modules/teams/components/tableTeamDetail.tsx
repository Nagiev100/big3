import {useEffect, useState} from "react";
import {get} from "../../../api/baseFetch";
import {IPlayer} from "./TeamDetailing";
import styled from "styled-components";
import {Container} from "../../../common/components/shared/CenterImage";
import {Image} from "../../../common/components/shared/ImageCompanent";


interface IProps {
    playersInTeam: IPlayer[] | null;
}


export const TableTeamDetail = ({playersInTeam}: IProps) => {

    return (
        <>
            <Table>
                <Label>Roster</Label>
                <Tr>
                    <TD>#</TD>
                    <TD>Player</TD>
                    <TD>Height</TD>
                    <TD>Weight</TD>
                    <TD>Age</TD>
                </Tr>
                {
                    playersInTeam && playersInTeam.map((player, index) =>
                        <Tr>

                            <Td>{player.number}</Td>
                            <Td>
                             <Container>
                                 <Container display='flex' flexDirection='row' heightProps='56px'>
                                     <Image src={'http://dev.trainee.dex-it.ru' + player.avatarUrl} widthProps='52px' heightProps='38px'/>
                                     <Container display='grid' marginLeft='10px'>
                                         <InformationName>{player.name}</InformationName>
                                         <InformationPosition>{player.position}</InformationPosition>
                                     </Container>
                                 </Container>
                             </Container>
                            </Td>
                            <Td>{player.height}<Span>cm</Span></Td>
                            <Td>{player.weight}<Span>kg</Span></Td>
                            <Td>{player.birthday}</Td>
                        </Tr>
                    )
                }

            </Table>

        </>
    )
}

const Label = styled.label`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  color: #707070;
  
`
const Table =styled.table`
  width: 1140px;
  background-color:#FFFFFF;
  margin-top: 24px;
  margin-left: 80px;
  border: 0.5px solid var(--ui-light-grey, #9C9C9C);
  
`
const Td = styled.td`
 border-top: 0.5px solid var(--ui-light-grey, #9C9C9C);
  height: 56px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #707070;
`
const TD = styled.td`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #707070;
`
const Tr =styled.tr`
  border-top: 0.5px solid var(--ui-light-grey, #9C9C9C) ;
  
`
const Span =styled.span`
 padding-left: 5px;
`
const InformationName = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #707070;
`
const InformationPosition =styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 21px;
  color: #9C9C9C;
`