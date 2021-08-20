import React, { useState, useEffect } from 'react'
import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { removeUserSession } from '../utils/Common';
import { getTokenLocal } from '../utils/Common';
import { Link } from "react-router-dom";

const { Header } = Layout;

const handleClickLogout = () => {
  removeUserSession();
}

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">Thông tin cá nhân</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/history">Xem lịch sử</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/statistic">Xem thống kê</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/change-password">Đổi mật khẩu</Link>
    </Menu.Item>
    <Menu.Item onClick={handleClickLogout}>
      <Link to="/login">Đăng xuất</Link>
    </Menu.Item>
  </Menu>
);

const MyHeader = () => {
  const [token, setToken] = useState<any>(getTokenLocal());
  const url = window.location.pathname;

  useEffect(() => {
    setToken(getTokenLocal());
  }, [token]);

  return (
    <Header>
      <div className="header__left-side">
        <div className="header__left-side__logo">
          <Link to="/">
            <img src="http://thehoneycoffee.com/wp-content/themes/thehoneycoffee/assets/images/logo_text_yellow.png" />
          </Link>
        </div>
        <Menu theme="dark"
          defaultSelectedKeys={url === "/" ? ['1'] : url === "/product" ? ["2"] : url === "/contact" ? ["3"] : ["0"]}
        >
          <Menu.Item key="1"><Link to="/">Trang chủ</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/product">Sản phẩm</Link></Menu.Item>
          <Menu.Item key="3" className="header__contact"><Link to="/contact">Liên lạc</Link></Menu.Item>
        </Menu>
      </div>
      <div className="header__right-side">
        <Menu theme="dark"
          defaultSelectedKeys={(url === "/cart" || url === "/login") ? ['1'] : ["2"]}
        >
          <Menu.Item key="1">
            <Link to="/cart"><ShoppingCartOutlined className="header__icons" /></Link>
          </Menu.Item>
          {
            token ? (
              <Dropdown overlay={menu} placement="bottomRight">
                <Menu.Item key="2"><UserOutlined className="header__icons" /></Menu.Item>
              </Dropdown>
            ) : (
              <>
                <Menu.Item>
                  <Link to="/login">Đăng nhập</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/register">Đăng ký</Link>
                </Menu.Item>
              </>
            )
          }
        </Menu>
      </div>
    </Header>
  )
}

export default MyHeader
