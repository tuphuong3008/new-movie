import React, { useEffect, useState } from "react";


//Material UI
import { Box, Button, Container, Grid, Typography } from "@mui/material";

//Components
import Image from "../../components/Image";
import { movieDetailsActions } from "../../redux/slice/movieDetails";
import Loader from "../../components/Loading/Loading";
import Header from "../../layout/Header/Header";
import "./style.scss";
import MovieDetail from "./MovieDetail";
import { Tabs } from "antd";
import CumRapDetail from "./CumRapDetail";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../layout/Footer";
const Detail = () => {
  const { loading, data, error } = useSelector(
    (state) => state.movieDetailsSlice
  );

  return (
    <div>
      <Header />

      <MovieDetail />
      <div className="container w-3/4 py-10">


        <div className="cum_rap">
          <Tabs
            tabPosition="left"
            style={{
              height: "50vh",
            }}
            items={data?.heThongRapChieu?.map((cumrap, index) => {
          
              return {
                label: <img className="w-14" src={cumrap.logo} />,
                key: cumrap.maHeThongRap,
                children: <CumRapDetail cumRapChieu={cumrap.cumRapChieu} />,
              };
            })}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Detail;
