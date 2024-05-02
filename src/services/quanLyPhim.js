import { http } from './config'

export const quanLyPhimServ = {
    getAllBanner: () => {
        return http.get("/QuanLyPhim/LayDanhSachBanner");
    },
    getAllMovie: (tenPhim = "") => {
        if (tenPhim.trim() != "") {
            return http.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`)
        }
        return http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
    },
    themPhimUploadHinh: (data) => {
        return http.post("/QuanLyPhim/ThemPhimUploadHinh", data)
    },
    getMovieByMaPhim: (maPhim) => {
        return http.get(`/QuanLyPhim/LayThongTinPhim?maPhim=${maPhim}`)
    },
    capNhatPhimUpload: (data) => {
        return http.post(`/QuanLyPhim/CapNhatPhimUpload`, data)
    },
    xoaPhim: (maPhim) => {
        return http.delete(`/QuanLyPhim/XoaPhim?maPhim=${maPhim}`)
    }
}