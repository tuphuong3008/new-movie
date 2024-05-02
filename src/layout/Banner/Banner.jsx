import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import "./banner.scss";
import { useDispatch } from "react-redux";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const [arrBanner, setArrBanner] = useState([]);

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    quanLyPhimServ
      .getAllBanner()
      .then((res) => {
        dispatch(handleTurnOffLoading());
        setArrBanner(res.data.content);
      })
      .catch((err) => {
        dispatch(handleTurnOffLoading());
        console.log(err);
      });
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="carousel__banner">
      <Carousel
        autoplay={true}
        autoplaySpeed={2000}
        nextArrow={
          <div>
            <i className="fa-regular fa-arrow-right"></i>
          </div>
        }
        prevArrow={
          <div>
            <i className="fa-regular fa-arrow-left"></i>
          </div>
        }
        arrows={true}
        dots={true}
        afterChange={onChange}
      >
        {arrBanner.map((banner, index) => (
          <div key={index} className="h-screen-70">
            <img src={banner.hinhAnh} className="w-full" alt="hinhBanner" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
