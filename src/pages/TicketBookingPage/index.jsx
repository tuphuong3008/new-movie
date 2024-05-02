import  useScrollToTop  from "../../hooks/useScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Material UI
import { Box, Container, Grid } from "@mui/material";

// Components
import TicketBookingCard from "./TicketBookingCard";
import SeatSelector from "./SeatSelector";
import Modal from "../../components/Modal";

// Redux actions
import {fetchTicketBookingDetails , closeModal } from "../../redux/slice/ticketBooking";

// Scss
import "./style.scss";

const TicketBookingPage = () => {
  useScrollToTop();
  const { scheduleId } = useParams();
  const dispatch = useDispatch();
  // const modalProps = useSelector((rootReducer) => rootReducer.ticketBooking.modal);
  const { modal  } = useSelector((state) => state.ticketBookingSlice);
  useEffect(() => {
    dispatch(fetchTicketBookingDetails(scheduleId));
  }, []);

  return (
    <Box className="container ticket-booking-page " component="section">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item md={8.5} xs={12}>
            <SeatSelector />
          </Grid>
          <Grid item md={3.5} xs={12}>
            <TicketBookingCard />
          </Grid>
        </Grid>
        <Modal actCloseModal={closeModal} modalProps={modal} />
      </Container>
    </Box>
  );
};

export default TicketBookingPage;
