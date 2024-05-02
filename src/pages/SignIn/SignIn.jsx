import React, { useContext } from 'react'
import InputCustom from '../../components/Input/InputCustom'
import Lottie from 'react-lottie'
import * as registerAnimation from "./../../assets/animation/register.json"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { quanLyNguoiDungServ } from '../../services/quanLyNguoiDung'
import { NotifyContext } from '../../template/UserTemplate/UserTemPlate'
import { saveLocalStorage } from '../../utils/util'

const SignIn = () => {
    const notify = useContext(NotifyContext);
    const navigate = useNavigate();
    const { handleChange, handleBlur, values, errors, touched, handleSubmit } = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                // gửi dữ liệu lên backend
                const res = await quanLyNguoiDungServ.dangNhap(values);
                console.log(res);
                saveLocalStorage("user", res.data.content);
                notify("đăng nhập thành công khách hàng sẻ được chuyển hướng về trang chủ");
                setTimeout(() => {
                    navigate("/");
                }, 1000)
            } catch (error) {
                console.log(error)
                notify(error.response.data.content);
            }
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Vui lòng nhập tài khoản"),
            matKhau: Yup.string().required("Vui lòng nhập mật khẩu")
        })
    });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: registerAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="h-screen flex">
            <div className="animation_signIn w-7/12 flex items-center justify-center">
                <Lottie options={defaultOptions}
                    height={400}
                    width={400} />
            </div>
            <div className="form_signIn w-5/12 flex items-center justify-center flex-col">
                <div className="p-10 border border-gray-400 rounded-md space-y-5">
                    <h1>Đăng nhập vào movie CyberSoft</h1>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <InputCustom
                            placeholder="Vui lòng nhập tài khoản"
                            id="taiKhoan"
                            label="Tài khoản"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.taiKhoan}
                            touched={touched.taiKhoan}
                            name="taiKhoan"
                            value={values.taiKhoan} />
                        <InputCustom
                            placeholder="Vui lòng nhập mật khẩu"
                            id="matKhau"
                            label="Mật khẩu"
                            onChange={handleChange}
                            type="password"
                            onBlur={handleBlur}
                            error={errors.matKhau}
                            touched={touched.matKhau}
                            name="matKhau"
                            value={values.matKhau}
                            autocomplete="on"
                        />
                        <div>
                            <p>Chưa có tài khoản ư? bấm
                                <NavLink to="/sign-up" className="mx-1 text-blue-500">vào đây</NavLink>
                                để đăng ký</p>
                            <button type="submit"
                                className="py-2 px-5 bg-black text-white rounded-md w-full">Đăng nhập</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default SignIn