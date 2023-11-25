import {useEffect, useState} from "react";
import {get} from "../../../api/baseFetch";
import {IPlayer} from "./TeamDetailing";


interface IProps {
    playersInTeam: IPlayer[] | null;
}

export const TableTeamDetail = ({playersInTeam}: IProps) => {

    return (
        <>
            <table>
                <label>Roster</label>
                <tr>
                    <td>#</td>
                    <td>Player</td>
                    <td>Height</td>
                    <td>Weight</td>
                    <td>Age</td>
                </tr>
                {
                    playersInTeam && playersInTeam.map((player, index) =>
                        <tr>
                            <td>{}</td>
                            <td>{player.name}</td>
                            <td>{player.weight}</td>
                            <td>{player.weight}</td>
                            <td>{player.birthday}</td>
                        </tr>
                    )
                }

            </table>

        </>
    )
}