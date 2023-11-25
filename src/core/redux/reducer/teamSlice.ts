import { createSlice } from "@reduxjs/toolkit";
import {fetchTeam, fetchTeams} from "./teamThunk";

export interface ITeamsResponse {
    pageSize: number;
    page: number;
    count: number;
    data: ITypeTeam[] ;
}

export interface ITypeTeam{
    name: string,
    foundationYear: number,
    division: string | null,
    conference: string | null,
    imageUrl: string | null,
    id: number
}

export interface ITeamState {
    data: ITeamsResponse | null;
    currentTeam:any;
    error: boolean;
    isLoading: boolean;
}

const initialState: ITeamState = {
    data: null,
    error: false,
    isLoading: false,
    currentTeam:null
};
 export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
    },
     extraReducers: (builder) => {
         builder.addCase(fetchTeams.pending, (state, action) => {
             state.isLoading = true;
             state.data = state.data;
             state.error = state.error;
         })
         builder.addCase(fetchTeams.fulfilled, (state, action) => {
             state.isLoading = false;
             state.data = action.payload;
             state.error = false;
         })
         builder.addCase(fetchTeams.rejected, (state, action) => {
             state.isLoading = false;
             state.data = state.data;
             state.error = true;
         })


         builder.addCase(fetchTeam.pending, (state, action) => {
                 state.isLoading = true;
                 state.currentTeam = state.currentTeam;
                 state.error = state.error;
             })
         builder.addCase(fetchTeam.fulfilled, (state, action) => {
             state.isLoading = false;
             state.currentTeam = action.payload;
             state.error = false;
         })
         builder.addCase(fetchTeam.rejected, (state, action) => {
             state.isLoading = false;
             state.currentTeam = state.currentTeam;
             state.error = true;
         })
     }
});
export const {  } = teamSlice.actions;


