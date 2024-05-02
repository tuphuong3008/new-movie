import React, { useEffect, useState } from 'react';
import { getLocalStorage } from "../../utils/util"

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    EditOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminTemlate = () => {
    const { maPhim } = useParams();
    useEffect(() => {
        const user = getLocalStorage("user")
        // console.log(user)
        if (!user) {
            window.location.href = "http://google.com"
        }
        if (user?.maLoaiNguoiDung !== "QuanTri") {
            window.location.href = "http://google.com"
        }
    })
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className="min-h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <VideoCameraOutlined />,
                            label: <NavLink to="/admin/quan-li-phim">Quản lý phim</NavLink>,
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <NavLink to="/admin/them-phim">Thêm phim</NavLink>,
                        },
                        {
                            key: '3',
                            icon: <EditOutlined />,
                            label: <NavLink to={`/admin/edit-phim/${maPhim}`}>Edit phim</NavLink>,
                        },
                        {
                            key: '4',
                            icon: <CalendarOutlined />,
                            label: <NavLink to={`/admin/show-time/${maPhim}`}>Show time</NavLink>,
                        },
                        {
                            key: '5',
                            icon: <CalendarOutlined />,
                            label: <NavLink to={`/admin/quan-li-user`}>Quản lý User</NavLink>,
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminTemlate