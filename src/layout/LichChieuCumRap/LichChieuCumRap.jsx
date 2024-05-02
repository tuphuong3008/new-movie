import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { quanLyRapServ } from "../../services/quanLyRap";
import LichChieuPhim from "../../components/LichChieuPhim/LichChieuPhim";
import "./style.scss"; // Import file SCSS để tùy chỉnh giao diện

const LichChieuCumRap = () => {
  const [arrCumRap, setArrCumRap] = useState([]);

  useEffect(() => {
    quanLyRapServ
      .getAllThongTinCumRap()
      .then((res) => {
        setArrCumRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="divLichChieuCumRap">
      <div className="lich-chieu-cum-rap mt-10">
        <h2 className="font-bold text-3xl text-center">
          Danh sách lịch chiếu cụm rạp
        </h2>
        <div className="tab-container">
          <Tabs tabPosition="left" style={{ height: "700px" }}>
            {arrCumRap.map((cumrap, index) => (
              <Tabs.TabPane
                key={cumrap.maHeThongRap}
                tab={
                  <div className="tab-content">
                    <img className="logo" src={cumrap.logo} alt="logo" />
                    <span className="ten-cum-rap">{cumrap.tenHeThongRap}</span>
                  </div>
                }
              >
                <LichChieuPhim cumrap={cumrap.lstCumRap} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LichChieuCumRap;
