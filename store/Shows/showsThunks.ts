import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../src/axiosApi";
import {IFetchedShow, IShow} from "../../src/types";


export const fetchShows = createAsyncThunk<IFetchedShow[], string>(
    'shows/fetchShows',
    async (showList) => {
        const response = await axiosApi.get<IFetchedShow[]>(`search/shows?q=${showList}`);
        return response.data ?? [];
    }
);
export const fetchShowInfo = createAsyncThunk<IShow, number>(
    'shows/fetchShowInfo',
    async (showId) => {
        const response = await axiosApi.get<IShow>(`shows/${showId}`);
        return response.data;
    }
);