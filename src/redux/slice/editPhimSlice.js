import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyPhimServ } from "../../services/quanLyPhim"
import { handleTurnOffLoading, handleTurnOnLoading } from './loadingSlice'

const initialState = {
    movie: {},
}

export const getMovieByMaPhim = createAsyncThunk(
    "editPhim/getMovieByMaPhim",
    async (dataLocal, { _, dispatch }) => {
        const res = await quanLyPhimServ.getMovieByMaPhim(dataLocal);
        return res.data.content
    }
)

export const capNhatPhimUpload = createAsyncThunk(
    "editPhim/capNhatPhimUpload",
    async (dataLocal, { _, dispatch }) => {
        const res = await quanLyPhimServ.capNhatPhimUpload(dataLocal);
        return res.data.content
    }
)

export const xoaPhim = createAsyncThunk(
    "editPhim/xoaPhim",
    async (dataLocal, { _, dispatch }) => {
        const res = await quanLyPhimServ.xoaPhim(dataLocal);
        return res.data.content
    }
)

const editPhimSlice = createSlice({
    name: "editPhim",
    initialState,
    reducers: {
        handleGetMovieByMaPhim: (state, action) => {
            const movieData = action.payload;
            state.movie = movieData;
            state.initialValues = movieData;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieByMaPhim.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.initialValues = action.payload;
        });
    },
});

export const { handleGetMovieByMaPhim } = editPhimSlice.actions;

export default editPhimSlice.reducer;