// rxslice
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyPhimServ } from '../../services/quanLyPhim';
import { handleTurnOffLoading, handleTurnOnLoading } from './loadingSlice';

const initialState = {
    arrMovie: [],
}

export const getAllMovieThunk = createAsyncThunk("quanLyPhim/getAllMovieThunk",
    async (dataLocal = "", { _, dispatch }) => {
        dispatch(handleTurnOnLoading)
        const res = await quanLyPhimServ.getAllMovie(dataLocal);
        dispatch(handleTurnOffLoading)
        return res.data.content
    })

const phimSlice = createSlice({
    name: "quanLyPhim",
    initialState,
    reducers: {
        handleAllMovie: (state, action) => {
            console.log(action)
            state.arrMovie = action.payload
            console.log(state.arrMovie)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMovieThunk.fulfilled, (state, action) => {
            console.log(action)
            state.arrMovie = action.payload
        })
    }
});

export const { handleAllMovie } = phimSlice.actions

export default phimSlice.reducer