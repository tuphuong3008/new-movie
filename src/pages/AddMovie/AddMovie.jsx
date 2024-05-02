import React, { useState } from 'react'
import InputCustom from '../../components/Input/InputCustom'
import { DatePicker } from 'antd'
import { Switch } from 'antd';
import { Rate } from 'antd';
import { useFormik } from 'formik';
import { quanLyPhimServ } from '../../services/quanLyPhim';

const AddMovie = () => {
    const [image, setImage] = useState();
    const {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        touched,
        setFieldValue } = useFormik({
            initialValues: {
                tenPhim: "",
                trailer: "",
                moTa: "",
                ngayKhoiChieu: "",
                sapChieu: true,
                dangChieu: true,
                hot: true,
                danhGia: 0,
                hinhAnh: ""
            },
            onSubmit: async (values) => {
                try {
                    console.log(values);
                    // tạo 1 đối tường từ lớp đối tượng formData
                    const formData = new FormData();
                    // sử dụng for in để duyệt qua object qua từng key và truyền dữ liệu vào formdata
                    for (let key in values) {
                        if (key == "hinhAnh") {
                            formData.append("File", values[key]);
                        }
                        else {
                            formData.append(key, values[key]);
                        }
                    }
                    const res = await quanLyPhimServ.themPhimUploadHinh(formData);
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            }
        }, [])
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputCustom
                    name="tenPhim"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tenPhim}
                    label="Tên phim"
                    placeholder="Nhập tên phim"
                />
                <InputCustom
                    name="trailer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.trailer}
                    label="Trailer"
                    placeholder="Nhập trailer"
                />
                <InputCustom
                    name="moTa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.moTa}
                    label="Mô tả"
                    placeholder="Nhập mô tả" />
                <div>
                    <label htmlFor="">Nhập ngày chiếu</label>
                    <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(datejs, dateString) => {
                            setFieldValue("ngayKhoiChieu", dateString)
                        }} />
                </div>
                <div>
                    <label htmlFor="">Đang chiếu</label>
                    <Switch onChange={(checked, event) => {
                        setFieldValue("dangChieu", checked)
                    }}
                        value={values.dangChieu} />
                </div>
                <div>
                    <label htmlFor="">Sắp chiếu</label>
                    <Switch onChange={(checked, event) => {
                        setFieldValue("sapChieu", checked)
                    }}
                        value={values.sapChieu} />
                </div>
                <div>
                    <label htmlFor="">Hot</label>
                    <Switch onChange={(checked, event) => {
                        setFieldValue("hot", checked)
                    }}
                        value={values.hot} />
                </div>
                <div>
                    <label htmlFor="">Đánh giá</label>
                    <Rate
                        value={values.danhGia / 2}
                        allowHalf
                        onChange={(value) => {
                            console.log(value);
                            setFieldValue("danhGia", value * 2)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Hình ảnh</label>
                    <input
                        onChange={(event) => {
                            console.log(event.target.files[0]);
                            const urlImage = URL.createObjectURL(event.target.files[0])
                            console.log(urlImage);
                            setImage(urlImage)
                            setFieldValue("hinhAnh", event.target.files[0])
                        }}
                        type="file" />
                    <img className="w-32" src={image} alt="" />
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded my-2 text-xl py-2 px-2 ">Thêm phim</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie