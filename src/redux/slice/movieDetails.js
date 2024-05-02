// movieDetailsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieApi } from '../../services/movieApi';
import { quanLyRapServ } from "../../services/quanLyRap";

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId, thunkAPI) => {
    try {
      const movieDetails = await quanLyRapServ.LayThongTinLichChieuPhim(movieId);
      return movieDetails.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default movieDetailsSlice.reducer;
export const movieDetailsActions = { ...movieDetailsSlice.actions, fetchMovieDetails };
