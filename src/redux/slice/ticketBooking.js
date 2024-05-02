import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketBookingApi from "../../services/ticketBookingApi";
import { Box } from "@mui/material";
import { Button } from "antd";
import handleAcceptModal from "../../pages/TicketBookingPage/TicketBookingCard/index"

// Thunk action để lấy thông tin đặt vé
export const fetchTicketBookingDetails = createAsyncThunk(
  "ticketBooking/fetchTicketBookingDetails",
  async (id, { rejectWithValue }) => {
    try {
      const params = { maLichChieu: id };
      const ticketBookingDetails = await ticketBookingApi.getTicketOfficeList(
        params
      );
      return ticketBookingDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action để đặt vé
export const bookTicket = createAsyncThunk(
  "ticketBooking/bookTicket",
  async (ticket, { rejectWithValue }) => {
    try {
      await ticketBookingApi.bookTicket(ticket);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define slice
const ticketBookingSlice = createSlice({
  name: "ticketBooking",
  initialState: {
    ticketBookingDetails: {
      data: null,
      loading: false,
      error: "",
    },
    bookTicket: {
      loading: false,
      error: "",
    },
    selectedSeats: [],
    modal: {
      open: false,
      title: "",
      children: [],
      buttonContent: "Chấp nhận",
      path: "",
    },
  },
  reducers: {
    // Action creator để chọn ghế
    chooseSeat(state, action) {
      const seat = action.payload;
      const selectedSeats = state.selectedSeats.slice();

      const idx = selectedSeats.findIndex(
        (selectedSeat) => selectedSeat.id === seat.id
      );
      if (idx !== -1) {
        selectedSeats.splice(idx, 1);
        state.selectedSeats = selectedSeats;
      } else {
        if (selectedSeats.length === 10) {
          state.modal = {
            ...state.modal,
            open: true,
            title: "Thông báo",
            children: [
              "Bạn chỉ có thể mua được tối đa 10 ghế.",
              "Vui lòng liên hệ supports CyberSoft để được hỗ trợ tốt hơn.",
            ],
            path: "",
          };
        } else {
          selectedSeats.push(seat);
          state.selectedSeats = selectedSeats;
        }
      }
    },
    // Action creator để đóng modal
    closeModal(state) {
      state.modal.open = false;
    },
    clearBooking(state) {
      state.selectedSeats = [];
    },
  },
  extraReducers: (builder) => {
    // Xử lý khi request lấy thông tin đặt vé
    builder.addCase(fetchTicketBookingDetails.pending, (state) => {
      state.ticketBookingDetails.loading = true;
    });
    builder.addCase(fetchTicketBookingDetails.fulfilled, (state, action) => {
      state.ticketBookingDetails.loading = false;
      state.ticketBookingDetails.data = action.payload;
    });
    builder.addCase(fetchTicketBookingDetails.rejected, (state, action) => {
      state.ticketBookingDetails.loading = false;
      state.ticketBookingDetails.error = action.payload;
    });

    // Xử lý khi request đặt vé
    builder.addCase(bookTicket.pending, (state) => {
      state.bookTicket.loading = true;
    });
    builder.addCase(bookTicket.fulfilled, (state) => {
      state.bookTicket.loading = false;
      if (!state.selectedSeats.length) {
        state.modal = {
          ...state.modal,
          open: true,
          title: "Thông báo",
          children: [
            "Vui lòng chọn ít nhất một chỗ ngồi! Bạn có thể mua được tối đa 10 ghế.",
          ],
          path: "",
        };
      } else {
        state.modal = {
          ...state.modal,
          open: true,
          title: "Thông báo",
          children: [
            "Đặt vé thành công!",
            "Chúc bạn có trải nghiệm xem phim vui vẻ tại Cybersoft Cinema",
          ],
          path: "/",
        };
      }
    });
    builder.addCase(bookTicket.rejected, (state, action) => {
      state.bookTicket.loading = false;
      state.bookTicket.error = action.payload;
    });
  },
});

export const { chooseSeat, closeModal, clearBooking } = ticketBookingSlice.actions;

export default ticketBookingSlice.reducer;
