import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITeamsResponse } from "./teamSlice";
import { get } from "../../../api/baseFetch";

export const fetchTeams = createAsyncThunk<
  ITeamsResponse,
  { page?: number; pageSize?: number; name?: string }
>("team/getTeams", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    let link = `Team/GetTeams?pageSize=${params.pageSize}`;
    if (params.name) {
      link += `&name=${params.name}`;
    }
    if (params.page) {
      link += `&page=${params.page}`;
    }
    const response = get(link, token!);
    return response;
  } catch (e) {}
});

export const fetchTeam = createAsyncThunk<any, { id: string }>(
  "team/getTeam",
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = get(`Team/Get?id=${params.id}`, token!);
      return response;
    } catch (e) {}
  },
);
