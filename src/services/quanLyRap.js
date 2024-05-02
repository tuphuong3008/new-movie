import { http } from "./config"
const resourceName = "QuanLyRap/";
export const quanLyRapServ = {
    getAllThongTinCumRap() {
        return http.get(`/${resourceName}LayThongTinLichChieuHeThongRap?maNhom=GP01`)
    },
    LayThongTinLichChieuPhim: (maPhim) => {
        const url = `/${resourceName}LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
        return http.get(url);
    },
    layThongtinHeThongRap: () => {
        return http.get(`/QuanLyRap/LayThongtinHeThongRap`);
    },
    layThongTinCumRapTheoHeThong: (maHeThongRap) => {
        return http.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}