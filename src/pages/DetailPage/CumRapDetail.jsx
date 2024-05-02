import moment from "moment";
import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

const CumRapDetail = ({ cumRapChieu }) => {
  console.log(cumRapChieu[0]);
  // let {maHeThongRap,tenHeThongRap,cumRapChieu}=cumRapChieu

  return (
    <div className="cumRapDetail">
      {cumRapChieu.map((cumrap) => {
        return (
          <div key={cumrap.maCumRap}>
            <div className="font-bold text-green-600 pb-2 pt-6">
              {cumrap.tenCumRap}
            </div>
            <div className="lichChieuPhim">
              {cumrap.lichChieuPhim?.map((item) => {
                return (
                  <div key={item.maLichChieu} className="px-2">
                    <NavLink to={`/ticket-booking/${item.maLichChieu}`}>
                      <button className="border rounded py-2 px-4">
                        {moment(item.ngayChieuGioChieu).format("DD-MM-YYYY")} ~{" "}
                        {moment(item.ngayChieuGioChieu).format("HH:MM")}
                      </button>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CumRapDetail;
