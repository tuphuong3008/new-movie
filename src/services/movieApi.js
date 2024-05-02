import { http } from "./config"

const resourceName = "QuanLyPhim/";

export const movieApi = {
  getBannerList: () => {
    const url = resourceName + "LayDanhSachBanner";
    return http.get(url);
  },
  getMovieList: (params, movieName) => {
    let url;
    if (movieName !== "") {
      url = resourceName + `LayDanhSachPhim?maNhom=${params.maNhom}&tenPhim=${movieName}`;
      return http.get(url);
    } else {
      url = resourceName + "LayDanhSachPhim";
      return http.get(url, { params });
    }
  },
  getPaginatedMovieList: (params) => {
    const url = resourceName + "LayDanhSachPhimPhanTrang";
    return http.get(url, { params });
  },
  getMovieListByDate: (params) => {
    const url = resourceName + "LayDanhSachPhimTheoNgay";
    return http.get(url, { params });
  },
  getMovieDetails: (params) => {
    const url = resourceName + `LayThongTinPhim?MaPhim=${params}`;
    return http.get(url);
  },
  deleteMovie: (params) => {
    const url = resourceName + `XoaPhim?MaPhim=${params}`;
    return http.delete(url);
  },
  addMovie: (formData) => {
    const url = resourceName + "ThemPhimUploadHinh";
    return http.post(url, formData);
  },
  editMovie: (formData) => {
    const url = resourceName + "CapNhatPhimUpload";
    return http.post(url, formData);
  },
};

