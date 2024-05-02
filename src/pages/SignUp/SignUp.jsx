import { useFormik } from 'formik'
import React, { useContext } from 'react'
import InputCustom from '../../components/Input/InputCustom'
import * as Yup from 'yup'
import { quanLyNguoiDungServ } from '../../services/quanLyNguoiDung'
import { NotifyContext } from '../../template/UserTemplate/UserTemPlate'
import { saveLocalStorage } from '../../utils/util'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const notify = useContext(NotifyContext);
    const navigate = useNavigate();
    const {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        touched,
        errors } = useFormik({
            initialValues: {
                taiKhoan: "",
                matKhau: "",
                nhapLaiMatKhau: "",
                hoTen: "",
                email: "",
                soDt: "",
            },
            onSubmit: async (values) => {
                try {
                    const res = await quanLyNguoiDungServ.dangKy(values);
                    console.log(res);
                    saveLocalStorage("user", res.data.content);
                    notify("đăng ký thành công khách hàng sẻ được chuyển hướng về trang chủ");
                    setTimeout(() => {
                        navigate("/");
                    }, 1000)
                } catch (error) {
                    console.log(error)
                    notify(error.response.data.content);
                }
            },
            validationSchema: Yup.object({
                taiKhoan: Yup.string().required("Vui lòng nhập tài khoản").min(4, "Vui lòng nhập ít nhất 4 kí tự"),
                matKhau: Yup.string().required("Vui lòng nhập mật khẩu").min(4, "Vui lòng nhập ít nhất 4 kí tự"),
                nhapLaiMatKhau: Yup.string().oneOf([Yup.ref("matKhau"), null]).required("Vui lòng kiểm tra lại"),
                hoTen: Yup.string().required("Vui lòng nhập họ tên").min(4, "Vui lòng nhập ít nhất 4 kí tự"),
                email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email không hợp lệ").required("Vui lòng nhập email"),
                soDt: Yup.string().matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại")
            })
        })
    return (
        <div className="container w-1/2 p-10 border border-gray-400 rounded-md space-y-5">
            <h1 className="text-center text-red-500 font-bold text-2xl">Đăng ký</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <InputCustom
                    name="taiKhoan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taiKhoan}
                    label="Tài khoản"
                    placeholder="Nhập tên phim"
                    id="taiKhoan"
                    error={errors.taiKhoan}
                    touched={touched.taiKhoan}
                />
                <InputCustom
                    name="matKhau"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.matKhau}
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    type="password"
                    id="matKHau"
                    error={errors.matKhau}
                    touched={errors.matKhau}
                />
                <InputCustom
                    name="nhapLaiMatKhau"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nhapLaiMatKhau}
                    label="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    id="nhapLaiMatKhau"
                    error={errors.nhapLaiMatKhau}
                    touched={touched.nhapLaiMatKhau}
                />
                <InputCustom
                    name="hoTen"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hoTen}
                    label="Họ tên"
                    placeholder="Nhập họ tên"
                    id="hoTen"
                    error={errors.hoTen}
                    touched={touched.hoTen} />
                <InputCustom
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    label="Email"
                    placeholder="Nhập Email"
                    id="email"
                    error={errors.email}
                    touched={touched.email} />
                <InputCustom
                    name="soDt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.soDt}
                    label="Số điện thoại"
                    placeholder="Nhập họ tên"
                    id="hoTen"
                    error={errors.soDt}
                    touched={touched.soDt} />
                <div>
                    <button type="submit"
                        className="py-2 px-5 mt-5 bg-black text-white rounded-md w-full">Đăng ký</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp