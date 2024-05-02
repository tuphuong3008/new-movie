import React from "react";
import { Tabs } from "antd";
import "./lichChieuPhim.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
const LichChieuPhim = ({ cumrap }) => {
  return (
    <div>
      <Tabs
        className="tab_cum_rap"
        tabPosition="left"
        style={{ height: "700px" }}
        items={cumrap.map((item, index) => {
          return {
            label: (
              <div className="text-left uppercase label_cumrap">
                <h4 className="text-green-600 font-medium text-lg truncate">
                  {item.tenCumRap}
                </h4>
                <p className="text-gray-500 truncate text-xs">{item.diaChi}</p>
              </div>
            ),
            key: index,
            children: (
              <div>
                {item.danhSachPhim.map((phim, index) => {
                  return (
                    phim.dangChieu && (
                      <div className="flex my-10" key={index}>
                        <div>
                          <img
                            className="w-36 h-full"
                            src={phim.hinhAnh}
                            alt=""
                          />
                        </div>
                        <div className="ml-5">
                          {/* tên phim  */}
                          <h3 className="mb-3">
                            <span className="bg-orange-600 text-white rounded py-1 px-2 text-lg font-semibold mr-3">
                              C18
                            </span>
                            <span className="text-xl font-semibold">
                              {phim.tenPhim}
                            </span>
                          </h3>
                          {/* suất chiếu  */}
                          <div className="grid grid-cols-2 gap-5">
                            {/* Suất chiếu chỉ hiện thị 4 phần tử đầu trong mảng  */}
                            {phim.lstLichChieuTheoPhim
                              .slice(0, 4)
                              .map((gioChieu, index) => {
                                return (
                                  <div>
                                    <NavLink
                                      to={`/ticket-booking/${gioChieu.maLichChieu}`}
                                      className="lich-chieu-link"
                                    >
                                      <p className="space-x-3">
                                        {/* ngày tháng  */}
                                        <span>
                                          {moment(
                                            gioChieu.ngayChieuGioChieu
                                          ).format("DD-MM-YYYY")}
                                        </span>
                                        <span>~</span>
                                        {/* giờ chiếu  */}
                                        <span>
                                          {moment(
                                            gioChieu.ngayChieuGioChieu
                                          ).format("hh:mm")}
                                        </span>
                                      </p>
                                    </NavLink>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default LichChieuPhim;
