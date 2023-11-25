import {createSlice} from "@reduxjs/toolkit";
import {fetchPlayer, fetchPlayers} from "./playerThunk";

export interface IPlayerResponse {
    pageSize: number;
    page: number;
    count: number;
    data: ITypePlayer[] ;
}
export interface ITypePlayer{
    name: string,
    number: number,
    position: string,
    team: number,
    birthday: string,
    height: number,
    weight: number,
    avatarUrl: string,
    id: number
}
export interface IPlayerState {
    data: IPlayerResponse | null;
    currentPlayer:any;
    error: boolean;
    isLoading: boolean;
}
const initialState: IPlayerState = {
    data: null,
    error: false,
    isLoading: false,
    currentPlayer:null
};
export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlayers.pending, (state, action) => {
            state.isLoading = true;
            state.data = state.data;
            state.error = state.error;
        })
        builder.addCase(fetchPlayers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = false;
        })
        builder.addCase(fetchPlayers.rejected, (state, action) => {
            state.isLoading = false;
            state.data = state.data;
            state.error = true;
        })
        builder.addCase(fetchPlayer.pending, (state, action) => {
            state.isLoading = true;
            state.currentPlayer = state.currentPlayer;
            state.error = state.error;
        })
        builder.addCase(fetchPlayer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentPlayer = action.payload;
            state.error = false;
        })
        builder.addCase(fetchPlayer.rejected, (state, action) => {
            state.isLoading = false;
            state.currentPlayer = state.currentPlayer;
            state.error = true;
        })
    }
});
export const {  } = playerSlice.actions;
