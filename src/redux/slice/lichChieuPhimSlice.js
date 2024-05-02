// rxslice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleTurnOffLoading, handleTurnOnLoading } from "./loadingSlice";
import { quanLyRapServ } from "../../services/quanLyRap";

const initialState = {
  arrLichChieu: "",
};

export const getAllLichChieuThunk = createAsyncThunk(
  "quanlyRap/getAllLichChieuThunk",
  async (dataLocal, { _, dispatch }) => {
    dispatch(handleTurnOnLoading());
    const res = await quanLyRapServ.getAllThongTinLichChieu(dataLocal);
    dispatch(handleTurnOffLoading());
    // res.data.content
    return res.data.content;
  }
);

const lichChieuPhimSlice = createSlice({
  name: "quanlyRap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLichChieuThunk.fulfilled, (state, action) => {
      //   console.log(action);
      state.arrLichChieu = action.payload;
    });
  },
});

// export const {  } = lichChieuPhimSlice.actions;

export default lichChieuPhimSlice.reducer;
