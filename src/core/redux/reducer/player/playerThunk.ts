import {createAsyncThunk} from "@reduxjs/toolkit";
import {get} from "../../../../api/baseFetch";
import {IPlayerResponse} from "./playerSlice";

export const fetchPlayers = createAsyncThunk<IPlayerResponse, {page?: number, pageSize?: number, name?: string}>(
    'player/getPlayers',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = get (`Player/GetPlayers?pageSize=${params.pageSize}&page=${params.page}&name=${params.name}`, token!)

            return response
        }
        catch (e){
        }
    }
)
export const fetchPlayer = createAsyncThunk<any, {id:string}>(
    'player/getPlayer',
    async (params, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = get (`Player/Get?id=${params.id}`, token!)
            return response
        }
        catch (e){
        }
    }
)