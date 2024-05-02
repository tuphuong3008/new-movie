import { http } from "./config";

const resourceName = "QuanLyDatVe/";

const ticketBookingApi = {
  bookTicket: (ticket) => {
    const url = resourceName + "DatVe";
    return http.post(url, ticket);
  },
  getTicketOfficeList: (params) => {
    const url = resourceName + "LayDanhSachPhongVe";
    return http.get(url, { params });
  },
  createShowtime: (showtime) => {
    const url = resourceName + "TaoLichChieu";
    return http.post(url, showtime);
  },
};

export default ticketBookingApi;
