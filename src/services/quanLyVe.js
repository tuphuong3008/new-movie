import React from 'react'
import { http } from './config'

export const quanLyVeServ = {
  taoLichChieu: (thongTinLichChieu) => {
    return http.post(`QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
  }
}
