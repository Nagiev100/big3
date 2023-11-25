import {createSlice,PayloadAction} from "@reduxjs/toolkit";

export interface IName {
    userName:string;
}
const initialState : IName = {
    userName:''
}
export const userNameSlice = createSlice({
    name:'name',
    initialState,
    reducers:{
        addName:(state,action:PayloadAction<string>) => {
            state.userName = action.payload
        }
    }
})
export const { addName } = userNameSlice.actions;




