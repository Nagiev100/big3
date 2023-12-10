import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./reducer/teamSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { playerSlice } from "./reducer/player/playerSlice";

export const store = configureStore({
  reducer: {
    team: teamSlice.reducer,
    player: playerSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
