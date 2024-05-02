import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Cascader, InputNumber, DatePicker, Select } from 'antd';
import { quanLyRapServ } from '../../services/quanLyRap';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { quanLyVeServ } from '../../services/quanLyVe';

const ShowTime = (props) => {

    const params = useParams();
    const formik = useFormik({
        initialValues: {
            maPhim: params.id,
            ngayCheuGioChieu: "",
            maRap: "",
            giaVe: "",
        },
        onSubmit: async (value) => {
            try {
                const result = await quanLyVeServ.taoLichChieu(value)
                alert(result.data.content)
            } catch (error) {
                console.log("error", error.response?.data)
                console.log(typeof (value.ngayCheuGioChieu))
            }
        }
    })

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    });

    useEffect(async () => {
        try {
            let result = await quanLyRapServ.layThongtinHeThongRap()
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })
        } catch (error) {

        }
    }, [])

    const handleChangeHeThongRap = async (value) => {
        try {
            let result = await quanLyRapServ.layThongTinCumRapTheoHeThong(value);
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch (error) {
            console.log("error", error.response?.data)
        }
    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue("maRap", value)
    }

    // const onOk = (value) => {
    //     formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY HH:mm:ss'))
    //     console.log("value", moment(value).format('DD/MM/YYYY hh:mm:ss'))
    // }

    // const onChangeDate = (value) => {
    //     formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY HH:mm:ss'))
    //     console.log("value", moment(value).format('DD/MM/YYYY hh:mm:ss'))
    // }
    const onOk = (date, dateString) => {
        formik.setFieldValue("ngayCheuGioChieu", moment(date).format('DD/MM/YYYY HH:mm:ss'))
    }

    const onChangeDate = (date, dateString) => {
        formik.setFieldValue("ngayCheuGioChieu", moment(date).format('DD/MM/YYYY HH:mm:ss'))
    }

    const onChangeGiaVe = (value) => {
        formik.setFieldValue("giaVe", value)
    }

    const convertSelectHeThongRap = () => {
        return state.heThongRapChieu?.map((heThongRap, index) => {
            return {
                label: heThongRap.tenHeThongRap,
                value: heThongRap.maHeThongRap
            }
        })
    }

    const convertSelectCumRapTheoHeThongCumRap = () => {
        return state.cumRapChieu?.map((cumRap, index) => {
            return {
                label: cumRap.tenCumRap,
                value: cumRap.maCumRap
            }
        })
    }
    return (
        <div className='container'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className="text-2xl">Tạo lịch chiếu</h3>
                <Form.Item
                    label="Hệ thống rạp"
                >
                    <Select options={convertSelectHeThongRap()}
                        onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp"
                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" // Add Tailwind CSS classes
                    />
                </Form.Item>
                <Form.Item
                    label="Cụm rạp"
                >
                    <Select options={convertSelectCumRapTheoHeThongCumRap()} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp"
                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </Form.Item>
                <Form.Item
                    label="Ngày chiếu - giờ chiếu"
                >
                    <DatePicker
                        format="DD/MM/YYYY HH:mm:ss"
                        showTime
                        onChange={onChangeDate}
                        onOk={onOk}
                    />
                </Form.Item>
                <Form.Item
                    label="Giá vé"
                >
                    <InputNumber onChange={onChangeGiaVe} />
                </Form.Item>
                <Form.Item
                    label="Chức năng"
                >
                    <Button htmlType='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Tạo lịch chiếu</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ShowTime