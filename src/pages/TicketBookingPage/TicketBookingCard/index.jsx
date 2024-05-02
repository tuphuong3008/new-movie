import { useDispatch, useSelector } from "react-redux";

// Material UI
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Components
import Loading from "../../../components/Loading/Loading";

// Redux actions
import { bookTicket, clearBooking } from "../../../redux/slice/ticketBooking";

// Scss
import "./style.scss";
import { useState } from "react";

const TicketBookingCard = () => {
  const dispatch = useDispatch();
  // const { ticketBookingDetails, selectedSeats, bookTicket } = useSelector(
  //   (rootReducer) => rootReducer.ticketBooking,
  // );
  const ticketBookingDetails = useSelector(
    (state) => state.ticketBookingSlice.ticketBookingDetails
  );
  const selectedSeats = useSelector(
    (state) => state.ticketBookingSlice.selectedSeats
  );
  const bookTicketData = useSelector(
    (state) => state.ticketBookingSlice.bookTicket
  );

  const movie = ticketBookingDetails.data?.data?.content?.thongTinPhim;
  const loading = ticketBookingDetails.loading;

  const [openModal, setOpenModal] = useState(false); // State local cho trạng thái modal

  const renderSelectedSeats = () =>
    selectedSeats?.map((selectedSeat, idx) => {
      const endLine = idx === selectedSeats.length - 1;
      return (
        <span key={idx}>
          {selectedSeat.code}
          {endLine ? "" : ", "}
        </span>
      );
    });

  const renderPriceTotal = () => {
    const priceTotal = selectedSeats?.reduce(
      (priceTotal, selectedSeat) => priceTotal + selectedSeat.price,
      0
    );

    return priceTotal.toLocaleString();
  };

  const handleBookTicket = () => {
    const ticket = {
      maLichChieu: movie?.maLichChieu,
      danhSachVe: selectedSeats?.map((seat) => ({
        maGhe: seat.id,
        giaVe: seat.price,
      })),
    };

    dispatch(bookTicket(ticket));
    setOpenModal(true);
  };

  const handleAcceptModal = () => {
    dispatch(clearBooking()); // Xóa dữ liệu ghế đã chọn khi người dùng chấp nhận
    setOpenModal(false); // Đóng modal
  };

  return (
    <Card className="ticket-booking-card" elevation={24} square>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Movie image */}
          <CardMedia
            className="ticket-booking-card__media"
            component="img"
            alt="movie picture"
            image={movie?.hinhAnh}
          />
          {/* Card content */}
          <CardContent className="ticket-booking-card__content">
            {/* Movie name */}
            <Typography
              className="ticket-booking-card__movie-name"
              component="h2"
              variant="h5"
            >
              {movie?.tenPhim}
            </Typography>
            <Stack
              direction="row"
              justifyContent="between"
              alignItems="center"
              spacing={1}
            >
              <Box className="ticket-booking-card__movie-age-limit-label">
                C13
              </Box>
              <Typography
                className="ticket-booking-card__movie-age-limit-content"
                component="p"
              >
                (*) Phim chỉ dành cho khán giả từ 13 tuổi trở lên
              </Typography>
            </Stack>
            {/* Booking details */}
            <List>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Rạp:</strong> {movie?.tenCumRap} | {movie?.tenRap}
                </ListItemText>
              </ListItem>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Địa chỉ:</strong> {movie?.diaChi}
                </ListItemText>
              </ListItem>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Ngày chiếu:</strong> {movie?.gioChieu} |{" "}
                  {movie?.ngayChieu}
                </ListItemText>
              </ListItem>
            </List>
            <Divider className="ticket-booking-card__divider" />
            {/* Booked Seats */}
            <List>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Ghế:</strong> {renderSelectedSeats()}
                </ListItemText>
              </ListItem>
            </List>
            <Divider className="ticket-booking-card__divider" />
            {/* Total payment */}
            <Typography
              className="ticket-booking-card__total"
              variant="h5"
              sx={{ mt: "13px" }}
            >
              <strong>Tổng:</strong>{" "}
              <strong style={{ color: "var(--primary)" }}>
                {renderPriceTotal()} VNĐ
              </strong>
            </Typography>
          </CardContent>
          {/* Book ticket */}
          <CardActions sx={{ justifyContent: "center" }}>
            <LoadingButton
              className="ticket-booking-card__btn-booking"
              variant="contained"
              onClick={handleBookTicket}
              loading={bookTicketData.loading}
            >
              <button>Đặt Vé</button>
            </LoadingButton>
          </CardActions>{" "}
        </>
      )}
    </Card>
  );
};

export default TicketBookingCard;
