import { configureStore } from '@reduxjs/toolkit'
import phimSlice from "./slice/phimSlice"
import loadingSlice from "./slice/loadingSlice"
import movieDetailsSlice from './slice/movieDetails'
import ticketBookingSlice from './slice/ticketBooking'
import editPhimSlice from './slice/editPhimSlice'

export const store = configureStore({
        reducer: {
                // hoTen: () => {
                //     return "CyberSoft"
                // }
                phimSlice,
                loadingSlice,
                movieDetailsSlice,
                ticketBookingSlice,

                editPhimSlice
        }
})