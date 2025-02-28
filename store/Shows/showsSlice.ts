import {createSlice} from "@reduxjs/toolkit";
import {IFetchedShow, IShow} from "../../src/types";
import {fetchShowInfo, fetchShows} from "./showsThunks.ts";
import { RootState } from "../../src/app/store.ts";


interface ShowsState {
    shows: IFetchedShow[];
    show: IShow;
    loading: boolean;
    error: boolean;
}

const initialState: ShowsState = {
    shows: [],
    show: {id: 0, name: '', summary: '', image: {
        medium: '',
        }},
    loading: false,
    error: false,
};

export const selectShows = (state: RootState) => state.shows.shows;
export const selectShow = (state: RootState) => state.shows.show;
export const selectShowsLoading = (state: RootState) => state.shows.loading;

const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShows.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchShows.fulfilled, (state, action) => {
                state.loading = false;
                state.shows = action.payload;
            })
            .addCase(fetchShows.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchShowInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchShowInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.show = action.payload
            })
            .addCase(fetchShowInfo.rejected, (state) => {
                state.loading = false;
            })


    }
});

export const showsReducer = showsSlice.reducer;
